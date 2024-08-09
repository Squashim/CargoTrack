using CargoTrack.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using DotNetEnv;
using CargoTrack.Api.Services;
using CargoTrack.Api.Dtos;
using CargoTrack.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CargoTrack.Api.Helpers;

var builder = WebApplication.CreateBuilder(args);

Env.Load();


var connectionString = builder.Configuration.GetConnectionString("CargoTrackDatabase");
builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<CargoTrackDbContext>(options =>
        options.UseNpgsql(connectionString));


builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://your-identity-server"; // Change this to your identity server
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "cargo", 
            ValidAudience = "empty",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(AuthSettings.PrivateKey)) // Change this to your secret key
        };
    });

// Add authorization services
builder.Services.AddAuthorization();
builder.Services.AddScoped<AuthService>();

// Build the app
var app = builder.Build();

// Use authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Define endpoint mappings
app.MapGet("/", [Authorize] (CargoTrackDbContext dbContext) => 
    Results.Json(dbContext.AccountTypes.ToList()));

app.MapGet("/users", [Authorize] (CargoTrackDbContext dbContext) => 
    Results.Json(dbContext.User.ToList()));

app.MapGet("/vehicles", [Authorize] (CargoTrackDbContext dbContext) => 
    Results.Json(dbContext.Vehicles.ToList()));

app.MapPost("/authenticate", ([FromBody] User user, [FromServices] AuthService authService) => 
    authService.GenerateToken(user));

// Run the app
app.Run();
;