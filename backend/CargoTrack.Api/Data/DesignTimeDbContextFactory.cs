using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CargoTrack.Api.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<CargoTrackDbContext>
    {
        public CargoTrackDbContext CreateDbContext(string[] args)
        {
            // Build configuration
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // Get connection string from configuration
            var connectionString = configuration.GetConnectionString("CargoTrackDatabase");

            // Configure DbContextOptions
            var optionsBuilder = new DbContextOptionsBuilder<CargoTrackDbContext>();
            optionsBuilder.UseNpgsql(connectionString, b => b.MigrationsAssembly("CargoTrack.Api"));

            return new CargoTrackDbContext(optionsBuilder.Options);
        }
    }
}