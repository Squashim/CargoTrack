using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.DTOs;
using CargoTrack.Modules.Logistics.PublicApi;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace CargoTrack.Modules.Logistics.Services;

public class LogisticsModuleApi : ILogisticsModuleApi
{
    private readonly LogisticsDbContext _dbContext;

    public LogisticsModuleApi(LogisticsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<JobOfferDto>> GetJobsNearAsync()
    {

        var jobs = await _dbContext.JobOffers
            .Include(j => j.SourceDepot)
            .Include(j => j.TargetDepot)
            .Where(j => !j.IsTaken && j.ExpiresAt > DateTime.UtcNow)
            .OrderByDescending(j => j.Revenue) 
            .Take(50)
            .ToListAsync();

        return jobs.Select(j => new JobOfferDto(
            j.Id,
            j.CargoName,
            j.RequiredTrailer.ToString(), 
            j.WeightTons,
            j.Revenue,
            j.DistanceKm,
            j.SourceDepot.City,
            j.TargetDepot.City
        ));
    }

    public async Task<JobDetailsDto?> ReserveJobAsync(Guid jobId)
    {
        var job = await _dbContext.JobOffers
            .Include(j => j.SourceDepot)
            .Include(j => j.TargetDepot)
            .FirstOrDefaultAsync(j => j.Id == jobId);

        if (job == null || job.IsTaken) return null; 

        job.IsTaken = true;
        await _dbContext.SaveChangesAsync();

        return new JobDetailsDto(
            job.Id,
            job.SourceDepot.Location.Y, // Lat
            job.SourceDepot.Location.X, // Lon
            job.TargetDepot.Location.Y,
            job.TargetDepot.Location.X,
            job.CargoName,
            job.Revenue
        );
    }
}