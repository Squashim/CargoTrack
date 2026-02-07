using CargoTrack.Modules.Identity.DTOs;
using CargoTrack.Modules.Identity.Services;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Identity.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
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
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var (accessToken, refreshToken) = await _authService.LoginAsync(request.Email, request.Password);
            return Ok(new AuthResponse(accessToken, refreshToken, Guid.Empty));
        }
        catch (Exception)
        {
            return Unauthorized(new { Error = "Invalid Credentials" });
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var accessToken = await _authService.RefreshTokenAsync(request.RefreshToken);
            return Ok(new { AccessToken = accessToken });
        }
        catch (Exception ex)
        {
            return Unauthorized(new { Error = ex.Message });
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenRequest request)
    {
        try
        {
            await _authService.LogoutAsync(request.RefreshToken);
            return Ok(new { Message = "Logged out successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}
