using System.Reflection;
using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.Interfaces;
using CargoTrack.Modules.Logistics.Services;
using CargoTrack.Modules.Shared.Services;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CargoTrack.Modules.Logistics;

public static class LogisticsModule
{
    public static IServiceCollection AddLogisticsModule(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<LogisticsDbContext>(options =>
            options.UseNpgsql(connectionString,
                o => o.UseNetTopologySuite()));

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true);
        services.AddScoped<LogisticDataSeeder>(); 
        services.AddScoped<JobGeneratorService>(); 
        services.AddHostedService<JobGenerationWorker>();
        services.AddHttpClient<RouteService>();
        services.AddScoped<RouteService>();
        services.AddScoped<IJobOfferService, JobOfferService>();

        return services;
    }

  
}
