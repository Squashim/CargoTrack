using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.Entities;
using CargoTrack.Modules.Logistics.Constants;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Services;

public class JobGeneratorService
{
    private readonly LogisticsDbContext _dbContext;

    public JobGeneratorService(LogisticsDbContext dbContext)
    {
        _dbContext = dbContext;
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

    for (int i = 0; i< countToGenerate; i++)
        {
            var source = factories[random.Next(factories.Count)];
            var target = stores[random.Next(stores.Count)];

            var cargo = cargoTypes[random.Next(cargoTypes.Count)];

            var distanceMeters = source.Location.Distance(target.Location);
            var distanceKm = distanceMeters / 1000; 

            if(distanceKm < 10) distanceKm *=11;

            newJobs.Add(new JobOffer
            {
                Id = Guid.NewGuid(),
                SourceDepotId = source.Id,
                TargetDepotId = target.Id,
                
                CargoName = cargo.Name,
                RequiredTrailer = cargo.RequiredTrailer, 
                
                WeightTons = Math.Round(random.NextDouble() * (24.0 - 5.0) + 5.0, 1), // 5-24 tony
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