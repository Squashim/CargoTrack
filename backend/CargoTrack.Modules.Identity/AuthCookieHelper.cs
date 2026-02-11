using Microsoft.AspNetCore.Http;

namespace CargoTrack.Modules.Identity;

public static class AuthCookieHelper
{
    public static readonly TimeSpan AccessTokenTtl = TimeSpan.FromMinutes(15);
    public static readonly TimeSpan RefreshTokenTtl = TimeSpan.FromDays(7);

    public static void SetAccessTokenCookie(HttpContext context, string accessToken)
        => SetAccessTokenCookie(context, accessToken, AccessTokenTtl);

    public static void SetRefreshTokenCookie(HttpContext context, string refreshToken)
        => SetRefreshTokenCookie(context, refreshToken, RefreshTokenTtl);

    public static void SetAccessTokenCookie(HttpContext context, string accessToken, TimeSpan ttl)
    {
        var cookieOptions = BuildCookieOptions(context, ttl);
        context.Response.Cookies.Append("accessToken", accessToken, cookieOptions);
    }

    public static void SetRefreshTokenCookie(HttpContext context, string refreshToken, TimeSpan ttl)
    {
        var cookieOptions = BuildCookieOptions(context, ttl);
        context.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    public static void ClearAccessTokenCookie(HttpContext context)
    {
        var cookieOptions = BuildCookieOptions(context, TimeSpan.FromDays(-1));
        context.Response.Cookies.Append("accessToken", string.Empty, cookieOptions);
    }

    public static void ClearRefreshTokenCookie(HttpContext context)
    {
        var cookieOptions = BuildCookieOptions(context, TimeSpan.FromDays(-1));
        context.Response.Cookies.Append("refreshToken", string.Empty, cookieOptions);
    }

    private static CookieOptions BuildCookieOptions(HttpContext context, TimeSpan ttl)
    {
        var isHttps = context.Request.IsHttps;
        return new CookieOptions
        {
            HttpOnly = true,
            Secure = isHttps,
            SameSite = isHttps ? SameSiteMode.None : SameSiteMode.Lax,
            Expires = DateTime.UtcNow.Add(ttl)
        };
    }
}
