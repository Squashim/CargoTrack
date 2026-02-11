using CargoTrack.Modules.Identity.DTOs;
using CargoTrack.Modules.Identity.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Identity.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var userId = await _authService.RegisterAsync(request.Email, request.Password);
            return Ok(new { UserId = userId });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var (accessToken, refreshToken) = await _authService.LoginAsync(request.Email, request.Password);
            AuthCookieHelper.SetAccessTokenCookie(HttpContext, accessToken);
            AuthCookieHelper.SetRefreshTokenCookie(HttpContext, refreshToken);
            return Ok();
        }
        catch (Exception)
        {
            return Unauthorized(new { Error = "Invalid Credentials" });
        }
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var accessToken = await _authService.RefreshTokenAsync(request.RefreshToken);
            AuthCookieHelper.SetAccessTokenCookie(HttpContext, accessToken);
            return Ok(new { AccessToken = accessToken });
        }
        catch (Exception ex)
        {
            return Unauthorized(new { Error = ex.Message });
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        try
        {
            if (HttpContext.Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
            {
                await _authService.LogoutAsync(refreshToken);
                AuthCookieHelper.ClearAccessTokenCookie(HttpContext);
                AuthCookieHelper.ClearRefreshTokenCookie(HttpContext);
                return Ok(new { Message = "Logged out successfully" });
            }
            return BadRequest(new { Error = "Refresh token not found" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}
