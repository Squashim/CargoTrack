using Microsoft.AspNetCore.Identity;
using CargoTrack.Modules.Identity.Entities;

namespace CargoTrack.Modules.Identity.Services;

public class PasswordService
{
    private readonly PasswordHasher<User> _hasher = new();

    public string Hash(string password)
    {
        return _hasher.HashPassword(new User(), password);
    }

    public bool Verify(string passwordHash, string passwordInput)
    {
        var result = _hasher.VerifyHashedPassword(new User(), passwordHash, passwordInput);
        return result == PasswordVerificationResult.Success;
    }
}
