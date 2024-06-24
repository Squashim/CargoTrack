using CargoTrack.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("CargoTrackDatabase");


builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<CargoTrackDbContext>(options =>
        options.UseNpgsql(connectionString));


var app = builder.Build();


app.MapGet("/", (CargoTrackDbContext dbContext) => 
        Results.Json(dbContext.AccountTypes.ToList()) 
);
app.MapGet("/users", (CargoTrackDbContext dbContext) => Results.Json(dbContext.User.ToList()));
app.MapGet("/adres", (CargoTrackDbContext dbContext) => Results.Json(dbContext.Vehicles.ToList()));
app.Run();