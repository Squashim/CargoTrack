using CargoTrack.Modules.Identity.DTOs;
using CargoTrack.Modules.Identity.Database;
using CargoTrack.Modules.Identity.Interfaces;

namespace CargoTrack.Modules.Identity.Services;

public class UserService : IUserService
{
    private readonly IdentityDbContext _dbContext;

    public UserService(IdentityDbContext dbContext)
    {
        _dbContext = dbContext;
    }


    public async Task<UserInfoDto> GetUserInfoAsync(Guid userId)
    {
        var user = await _dbContext.Users.FindAsync(userId);
        if (user == null)
        {
            throw new Exception("USER_NOT_FOUND");
        }
        return new UserInfoDto(user.Email, user.UserName);
    }
}