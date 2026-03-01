using CargoTrack.Modules.Shared.Interfaces;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Transport.Services;

public class TruckService : ITruckService
{
    private readonly IUserContext userContext;
    private readonly TransportDbContext dbContext;

    public TruckService(IUserContext userContext, TransportDbContext dbContext)
    {
        this.userContext = userContext;
        this.dbContext = dbContext;
    }
    public Task<IEnumerable<TruckDto>> GetTrucksAsync()
    {
        var userId = userContext.UserId;

        var trucks = dbContext.Set<Entities.Truck>()
            .Where(t => t.Company.UserId == userId)
            .Select(t => new TruckDto
            {
                Id = t.Id,
                Model = t.Model,
                ProductionYear = t.ProductionYear,
                Condition = t.Condition,
                Fuel = t.Fuel,
                MaxFuel = t.MaxFuel,
                Odometer = t.Odometer,
                IsDriving = t.IsDriving,
                LicensePlate = t.LicensePlate,
                ImageUrl = t.ImageUrl,
                AttachedTrailer = t.CurrentTrailer != null ? new TrailerDto
                {
                    Id = t.CurrentTrailer.Id,
                    Type = t.CurrentTrailer.Type,
                    CargoCapacityKg = t.CurrentTrailer.CargoCapacityKg,
                    Condition = t.CurrentTrailer.Condition,
                    ModelName = t.CurrentTrailer.ModelName,
                    ImageUrl = t.CurrentTrailer.ImageUrl
                } : null
            })
            .ToList();

        return Task.FromResult(trucks.AsEnumerable());
    }
}