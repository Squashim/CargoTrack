using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Database;

public class LogisticsDbContext : DbContext
{
    public LogisticsDbContext(DbContextOptions<LogisticsDbContext> options) : base(options)
    {
    }

   public DbSet<NpcCompany> NpcCompanies { get; set; }
    public DbSet<Depot> Depots { get; set; }
    public DbSet<JobOffer> JobOffers { get; set; }
    public DbSet<CargoType> CargoTypes { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("logistics");
        modelBuilder.HasPostgresExtension("postgis");
        
        modelBuilder.Entity<NpcCompany>().HasIndex(c => c.Code).IsUnique();
        
        modelBuilder.Entity<Depot>().Property(x => x.Location).HasColumnType("geography(Point, 4326)");
        modelBuilder.Entity<CargoType>().HasIndex(c => c.Code).IsUnique();
}
}
