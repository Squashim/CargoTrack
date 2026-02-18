using System.Reflection;
using CargoTrack.Modules.Logistics.Database;
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

        // Dodaj tutaj swoje serwisy
        // services.AddScoped<ILogisticsService, LogisticsService>();

        return services;
    }
}
