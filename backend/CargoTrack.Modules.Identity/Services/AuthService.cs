using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CargoTrack.Modules.Identity.Database;
using CargoTrack.Modules.Identity.DTOs;
using CargoTrack.Modules.Identity.Entities;
using CargoTrack.Modules.Identity.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration; // Do pobrania SecretKey
using Microsoft.IdentityModel.Tokens;

namespace CargoTrack.Modules.Identity.Services;

public class AuthService : IAuthService
{
    private readonly IdentityDbContext _db;
    private readonly PasswordService _passwordService;
    private readonly IConfiguration _config;
    private readonly IValidator<RegisterRequest> _registerValidator;
    private readonly IValidator<LoginRequest> _loginValidator;

    public AuthService(IdentityDbContext db, PasswordService passwordService, IConfiguration config, IValidator<RegisterRequest> registerValidator, IValidator<LoginRequest> loginValidator)
    {
        _db = db;
        _passwordService = passwordService;
        _config = config;
        _registerValidator = registerValidator;
        _loginValidator = loginValidator;
    }

    public async Task<Guid> RegisterAsync(string email, string password, string userName)
    {
        var result = await _registerValidator.ValidateAsync(new RegisterRequest(email, password, userName));
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            UserName = userName,
            PasswordHash = _passwordService.Hash(password),
            Role = UserRole.Player
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return user.Id;
    }

    public async Task<(string AccessToken, string RefreshToken)> LoginAsync(string email, string password)
    {
        var result = await _loginValidator.ValidateAsync(new LoginRequest(email, password));
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors);
        }
        var user = await _db.Users
            .Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null || !_passwordService.Verify(user.PasswordHash, password))
        {
            throw new UnauthorizedAccessException("Invalid Credentials");
        }

        var accessToken = GenerateJwt(user);
        var refreshToken = GenerateRefreshToken();

        _db.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        });

        await _db.SaveChangesAsync();

        return (accessToken, refreshToken);
    }

    private string GenerateJwt(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("role", user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Auth:SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "CargoTrack",
            audience: "CargoTrack",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> RefreshTokenAsync(string refreshToken)
    {
        var token = await _db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (token is null || token.IsRevoked || token.ExpiresAt < DateTime.UtcNow)
        {
            throw new Exception("Invalid or expired refresh token");
        }

        var user = await _db.Users.FindAsync(token.UserId);
        if (user is null)
        {
            throw new Exception("User not found");
        }

        return GenerateJwt(user);
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var token = await _db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == refreshToken);

        if (token is not null)
        {
            token.IsRevoked = true;
            await _db.SaveChangesAsync();
        }
    }

    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }
}
