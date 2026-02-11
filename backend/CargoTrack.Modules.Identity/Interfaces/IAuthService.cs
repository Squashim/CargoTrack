using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Identity.Interfaces
{
    public interface IAuthService
    {
        Task<(string AccessToken, string RefreshToken)> LoginAsync(string email, string password);
        Task<Guid> RegisterAsync(string email, string password);
        Task<string> RefreshTokenAsync(string refreshToken);
        Task LogoutAsync(string refreshToken);
    }
}