using CargoTrack.Modules.Identity.DTOs;
using Microsoft.AspNetCore.Mvc;
using CargoTrack.Modules.Identity.Interfaces;
using CargoTrack.Modules.Shared.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace CargoTrack.Modules.Identity.Controllers;

[ApiController]
[Route("api/user")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IUserContext _userContext;
    public UserController(IUserService userService, IUserContext userContext)
    {
        _userService = userService;
        _userContext = userContext;
    }

    [HttpGet("")]
    public async Task<ActionResult<UserInfoDto>> GetCurrentUserInfo()
    {
        var userId = _userContext.UserId;
        var userInfo = await _userService.GetUserInfoAsync(userId);
        return Ok(userInfo);
    }
}