using CargoTrack.Modules.Identity.Entities;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Identity.Database;

public class IdentityDbContext : DbContext
{
    public IdentityDbContext(DbContextOptions<IdentityDbContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.HasDefaultSchema("identity");

    modelBuilder.Entity<User>(b => {
        b.HasKey(u => u.Id);
        b.HasIndex(u => u.Email).IsUnique();

        b.Property(u => u.Role)
         .HasConversion<string>(); 
    });
}
}
