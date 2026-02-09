using CargoTrack.Modules.Transport.BackgroundJobs;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CargoTrack.Modules.Transport;

public static class TransportModule
{
    public static IServiceCollection AddTransportModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<TransportDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
                o => o.UseNetTopologySuite()));

        services.AddHttpClient<RouteService>();
        services.AddScoped<RouteService>();
        services.AddScoped<SimulationService>();
        services.AddHostedService<TransportSimulationWorker>();

        return services;
    }
}