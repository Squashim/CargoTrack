using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.Entities;
using CargoTrack.Modules.Logistics.Constants;
using CargoTrack.Modules.Shared.Services;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Services;

public class JobGeneratorService
{
    private readonly LogisticsDbContext _dbContext;
    private readonly RouteService _routeService;

    public JobGeneratorService(LogisticsDbContext dbContext, RouteService routeService)
    {
        _dbContext = dbContext;
        _routeService = routeService;
    }

public async Task GenerateJobs(int countToGenerate){
    var cargoTypes = await _dbContext.CargoTypes.ToListAsync();
    if(!cargoTypes.Any()) return; 

    var factories = await _dbContext.Depots.Where(d => d.Type == DepotType.Factory || d.Type == DepotType.Warehouse)
        .ToListAsync();
    
    var stores = await _dbContext.Depots.Where(d => d.Type == DepotType.Store || d.Type == DepotType.Warehouse)
        .ToListAsync();

    if (!factories.Any() || !stores.Any()) return;

    var random = new Random();
    var newJobs = new List<JobOffer>();

    for (int i = 0; i < countToGenerate; i++)
        {
            var source = factories[random.Next(factories.Count)];
            var target = stores[random.Next(stores.Count)];

            var cargo = cargoTypes[random.Next(cargoTypes.Count)];

            var route = await _routeService.GetRouteAsync(
                source.Location.Y,
                source.Location.X,
                target.Location.Y,
                target.Location.X);

            var distanceKm = route.DistanceMeters / 1000.0;

            if (distanceKm < 10)
            {
                distanceKm *= 11;
            }

            newJobs.Add(new JobOffer
            {
                Id = Guid.NewGuid(),
                SourceDepotId = source.Id,
                TargetDepotId = target.Id,
                
                CargoName = cargo.Name,
                RequiredTrailer = cargo.RequiredTrailer, 
                
                WeightTons = Math.Round(random.NextDouble() * (24.0 - 5.0) + 5.0, 1), 
                DistanceKm = Math.Round(distanceKm, 0),
                Revenue = (decimal)(distanceKm * (double)cargo.BasePrice), 
                
                ExpiresAt = DateTime.UtcNow.AddHours(random.Next(2, 6)),
                IsTaken = false
            });
        }

        if (newJobs.Any())
        {
            _dbContext.JobOffers.AddRange(newJobs);
            await _dbContext.SaveChangesAsync();
        }
        }

}