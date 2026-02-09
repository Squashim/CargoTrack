using Microsoft.EntityFrameworkCore;
namespace CargoTrack.Modules.Transport.Database;

public class TransportDbContext : DbContext
{
    public TransportDbContext(DbContextOptions<TransportDbContext> options) : base(options)
    {
    }

    public DbSet<Entities.TransportJob> Transports { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("transport");
        modelBuilder.HasPostgresExtension("postgis");
        modelBuilder.Entity<Entities.TransportJob>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.RouteGeometry).HasColumnType("geography(LineString, 4326)");
            entity.Property(e => e.CurrentLocation).HasColumnType("geography(Point, 4326)");
        });
    }
}