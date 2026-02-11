using System;
using System.IdentityModel.Tokens.Jwt;
using CargoTrack.Modules.Identity;
using CargoTrack.Modules.Identity.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public class JwtRefreshMiddleware
{
    private readonly RequestDelegate _next;

    public JwtRefreshMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IAuthService authService)
    {
        var endpoint = context.GetEndpoint();
        if (endpoint != null)
        {

            var isAllowAnonymous = endpoint.Metadata.GetMetadata<IAllowAnonymous>() != null;
            if (isAllowAnonymous)
            {
                await _next(context);
                return;
            }
        }

        if (context.Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        {
            if (ShouldRefreshAccessToken(context))
            {
                try
                {
                    var newAccessToken = await authService.RefreshTokenAsync(refreshToken);
                    AuthCookieHelper.SetAccessTokenCookie(context, newAccessToken);
                    context.Items["AccessToken"] = newAccessToken;
                }
                catch (Exception)
                {
                    AuthCookieHelper.ClearAccessTokenCookie(context);
                }
            }
        }

        await _next(context);
    }

    private static bool ShouldRefreshAccessToken(HttpContext context)
    {
        if (!context.Request.Cookies.TryGetValue("accessToken", out var accessToken) ||
            string.IsNullOrWhiteSpace(accessToken))
        {
            return true;
        }

        var handler = new JwtSecurityTokenHandler();
        if (!handler.CanReadToken(accessToken))
        {
            return true;
        }

        var token = handler.ReadJwtToken(accessToken);
        var refreshThreshold = DateTime.UtcNow.AddMinutes(2);
        return token.ValidTo <= refreshThreshold;
    }

}