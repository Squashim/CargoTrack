using CargoTrack.Modules.Identity;
using CargoTrack.Modules.Identity.Database;
using CargoTrack.Modules.Transport;
using CargoTrack.API.Services;
using CargoTrack.Modules.Transport.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CargoTrack.API.Middleware;
using CargoTrack.Modules.Shared.Interfaces;
using CargoTrack.Modules.Shared.Services;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddIdentityModule(builder.Configuration);
builder.Services.AddTransportModule(builder.Configuration);


builder.Services.AddControllers()
.AddApplicationPart(typeof(IdentityModule).Assembly)
    .AddApplicationPart(typeof(TransportModule).Assembly);
builder.Services.AddSignalR();
builder.Services.AddSingleton<IUserIdProvider, SignalRUserIdProvider>();

var secretKey = builder.Configuration["Auth:SecretKey"];

if (string.IsNullOrEmpty(secretKey))
    throw new Exception("Missing SecretKey");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = "CargoTrack",
        ValidAudience = "CargoTrack",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if (context.HttpContext.Items.TryGetValue("AccessToken", out var refreshedTokenObj) &&
                refreshedTokenObj is string refreshedToken &&
                !string.IsNullOrWhiteSpace(refreshedToken))
            {
                context.Token = refreshedToken;
                return Task.CompletedTask;
            }
            if (string.IsNullOrEmpty(context.Token))
            {
                if (context.Request.Cookies.TryGetValue("accessToken", out var cookieToken))
                {
                    context.Token = cookieToken;
                }
            }
            return Task.CompletedTask;
        },
    };
});

builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserContext, UserContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<JwtRefreshMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ValidationExceptionMiddleware>();
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    services.GetRequiredService<IdentityDbContext>().Database.Migrate();
    services.GetRequiredService<TransportDbContext>().Database.Migrate();
}
app.MapHub<CargoTrack.Modules.Transport.Hubs.SimulationHub>("/hubs/transport");
app.Run();
