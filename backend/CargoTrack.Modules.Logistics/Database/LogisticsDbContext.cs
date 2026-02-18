using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Database;

public class LogisticsDbContext : DbContext
{
    public LogisticsDbContext(DbContextOptions<LogisticsDbContext> options) : base(options)
    {
    }

    // Dodaj tutaj swoje DbSety
    // public DbSet<Order> Orders { get; set; } = null!;
    // public DbSet<Warehouse> Warehouses { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");

        // Konfiguracja encji tutaj
        // modelBuilder.Entity<Order>(entity =>
        // {
        //     entity.ToTable("Orders", "logistics");
        //     entity.HasKey(e => e.Id);
        // });
    }
}
