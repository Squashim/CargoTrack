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
                Model = t.Model,
                ProductionYear = t.ProductionYear,
                Condition = t.Condition,
                Fuel = t.Fuel,
                MaxFuel = t.MaxFuel,
                Odometer = t.Odometer,
                IsDriving = t.IsDriving,
                AttachedTrailer = t.CurrentTrailer != null ? new TrailerDto
                {
                    Type = t.CurrentTrailer.Type,
                    CargoCapacityKg = t.CurrentTrailer.CargoCapacityKg,
                    Condition = t.CurrentTrailer.Condition
                } : null
            })
            .ToList();

        return Task.FromResult(trucks.AsEnumerable());
    }
}