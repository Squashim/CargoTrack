using Microsoft.EntityFrameworkCore;
using CargoTrack.Modules.Transport.Entities; 

namespace CargoTrack.Modules.Transport.Database;

public class TransportDbContext : DbContext
{
    public TransportDbContext(DbContextOptions<TransportDbContext> options) : base(options)
    {
    }

    public DbSet<TransportJob> Transports { get; set; } = null!;

    public DbSet<Company> Companies { get; set; } = null!;
    public DbSet<Garage> Garages { get; set; } = null!;
    public DbSet<Truck> Trucks { get; set; } = null!;
    public DbSet<Trailer> Trailers { get; set; } = null!;
    public DbSet<Driver> Drivers { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");

        modelBuilder.Entity<TransportJob>(entity =>
        {
            entity.ToTable("ActiveTransports", "transport");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.RouteGeometry).HasColumnType("geography(LineString, 4326)");
            entity.Property(e => e.CurrentLocation).HasColumnType("geography(Point, 4326)");

            entity.HasOne(e => e.Truck)
                  .WithMany()
                  .HasForeignKey(e => e.TruckId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Driver)
                  .WithMany()
                  .HasForeignKey(e => e.DriverId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Trailer)
                  .WithMany()
                  .HasForeignKey(e => e.TrailerId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Company)
                  .WithMany()
                  .HasForeignKey(e => e.CompanyId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        
        modelBuilder.Entity<Company>(entity =>
        {
            entity.ToTable("Companies", "game");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Balance).HasPrecision(18, 2); 
        });

        modelBuilder.Entity<Garage>(entity =>
        {
            entity.ToTable("Garages", "game");
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Location).HasColumnType("geography(Point, 4326)");

            entity.HasMany(g => g.Trucks)
                  .WithOne()
                  .HasForeignKey(t => t.GarageId)
                  .OnDelete(DeleteBehavior.Restrict); 
        });

        modelBuilder.Entity<Truck>(entity =>
        {
            entity.ToTable("Trucks", "game");
            entity.HasKey(e => e.Id);

            entity.HasOne(t => t.CurrentTrailer)
                  .WithOne(tr => tr.AttachedTruck)
                  .HasForeignKey<Trailer>(tr => tr.AttachedTruckId) 
                  .IsRequired(false); 
        });

        modelBuilder.Entity<Trailer>(entity =>
        {
            entity.ToTable("Trailers", "game");
            entity.HasKey(e => e.Id);
            
            
        });

        modelBuilder.Entity<Driver>(entity =>
        {
            entity.ToTable("Drivers", "game");
            entity.HasKey(e => e.Id);
            
            entity.HasOne<Truck>()
                  .WithMany() 
                  .HasForeignKey(d => d.AssignedTruckId)
                  .IsRequired(false);
        });
    }
}