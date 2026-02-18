using NetTopologySuite.Geometries;
using CargoTrack.Modules.Transport.Entities;


namespace CargoTrack.Modules.Transport.Domain;

public class CompanyFactory
{
    public (Company, Garage, Truck, Trailer, Driver) CreateStarterPack(
        Guid userId, 
        string companyName, 
        string colorHex, 
        double lat, 
        double lon)
    {
        var company = new Company
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = companyName,
            Color = colorHex,
            Balance = 50000m,
            CreatedAt = DateTime.UtcNow
        };

        var garageLocation = new Point(lon, lat) { SRID = 4326 };
        var garage = new Garage
        {
            Id = Guid.NewGuid(),
            CompanyId = company.Id,
            Location = garageLocation,
            Name = $"Siedziba - {companyName}",
            Slots = 3,
            Level = 1,
            Trucks = [],
            Trailers = []
        };

        var truck = new Truck
        {
            Id = Guid.NewGuid(),
            CompanyId = company.Id,
            GarageId = garage.Id,
            Model = "Scania R420",
            ProductionYear = 2010,
            Condition = 0.7m,
            LicensePlate = $"CT-{new Random().Next(1000, 9999)}",
            Fuel = 400.0m,
            MaxFuel = 1000.0m,
            Odometer = 850000.0m,
            IsDriving = false
        };

        var trailer = new Trailer
        {
            Id = Guid.NewGuid(),
            CompanyId = company.Id,
            ModelName = "Schmitz Cargobull S.KO",
            GarageId = garage.Id,
            AttachedTruckId = truck.Id,
            AttachedTruck = truck,
            Type = TrailerType.Curtain,
            Condition = 0.7
        };

        var driver = new Driver
        {
            Id = Guid.NewGuid(),
            CompanyId = company.Id,
            AssignedTruckId = truck.Id,
            Name = "(Właściciel)" 
        };

        return (company, garage, truck, trailer, driver);
    }
}