using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using CargoTrack.Api.Helpers;
using Microsoft.IdentityModel.Tokens;
using CargoTrack.Api.Models;

namespace CargoTrack.Api.Services;

public class AuthService
{
    public string GenerateToken(User user){
        var handler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(AuthSettings.PrivateKey);
        var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor = new SecurityTokenDescriptor {
            Subject = GenerateClaims(user),
            Expires = DateTime.UtcNow.AddMinutes(15),
            SigningCredentials = credentials,
        };
        var token = handler.CreateToken(tokenDescriptor);
        return handler.WriteToken(token);
    }
    private static ClaimsIdentity GenerateClaims(User user)
    {
        var claims = new ClaimsIdentity();
        if(!string.IsNullOrEmpty(user.Name)){
        claims.AddClaim(new Claim(ClaimTypes.Name, user.Name));}
        if(!string.IsNullOrEmpty(user.Id.ToString())){
         claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));}
         if(!string.IsNullOrEmpty(user.Email)){
           claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
         }
        
       

        return claims;
    }
}
