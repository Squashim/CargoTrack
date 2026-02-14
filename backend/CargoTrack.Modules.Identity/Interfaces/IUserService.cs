using CargoTrack.Modules.Identity.DTOs;

namespace CargoTrack.Modules.Identity.Interfaces;

public interface IUserService
{
    Task<UserInfoDto> GetUserInfoAsync(Guid userId);
}