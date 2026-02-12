using FluentValidation;
using Microsoft.AspNetCore.Mvc;
namespace CargoTrack.API.Middleware;

public class ValidationExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ValidationExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            await HandleExceptionAsync(context, ex, StatusCodes.Status400BadRequest, "Validation errors occurred");
        }
        catch (UnauthorizedAccessException ex)
        {
            await HandleExceptionAsync(context, ex, StatusCodes.Status401Unauthorized, "Unauthorized access");
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex, StatusCodes.Status500InternalServerError, "A server error occurred");
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception, int statusCode, string title)
    {
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/problem+json";

        object response;

        if (exception is ValidationException valEx)
        {
            var errors = valEx.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorCode).ToArray()
                );

            response = new ValidationProblemDetails(errors)
            {
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                Title = title,
                Status = statusCode,
                Detail = "See the errors property for more details."
            };
        }
        else if (exception is UnauthorizedAccessException)
        {
            var errors = new Dictionary<string, string[]>
            {
                {"Authorization", new[] { exception.Message }}
            };
            response = new ValidationProblemDetails(errors)
            {
                Type = "https://tools.ietf.org/html/rfc7235#section-3.1",
                Title = title,
                Status = statusCode,
                Detail = "Access is denied due to invalid credentials.",
            };
        }
        else
        {
            response = new ProblemDetails
            {
                Title = title,
                Status = statusCode,
                Detail = exception.Message,
                Instance = context.Request.Path
            };
        }

        await context.Response.WriteAsJsonAsync(response);
    }
}