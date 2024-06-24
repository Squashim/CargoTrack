using CargoTrack.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Api.Data
{
    public class CargoTrackDbContext : DbContext
    {
        public CargoTrackDbContext(DbContextOptions<CargoTrackDbContext> options) : base(options)
        {
        }

        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Adres> Adres { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Company> Company { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<ShipmentOrder> ShipmentOrders { get; set; }
        public DbSet<ShipmentStatus> ShipmentStatus { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
}
}