using CargoTrack.Contracts.Logistics.DTOs;
using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Services;

public class JobOfferService : IJobOfferService
{
    private readonly LogisticsDbContext _dbContext;

    public JobOfferService(LogisticsDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<JobOfferDto>> GetJobOffersAsync(CancellationToken cancellationToken = default)
    {
        var jobs = await _dbContext.JobOffers
            .Include(j => j.SourceDepot)
            .Include(j => j.TargetDepot)
            .Include(j => j.CargoType)
            .Where(j => !j.IsTaken && j.ExpiresAt > DateTime.UtcNow)
            .OrderByDescending(j => j.Revenue)
            .Take(50)
            .ToListAsync(cancellationToken);

        return jobs.Select(j => new JobOfferDto(
            j.Id,
            j.CargoName,
            j.CargoType.ImageUrl ?? "/images/cargo/default.png",
            j.RequiredTrailer.ToString(),
            j.WeightTons,
            j.Revenue,
            j.DistanceKm,
            j.SourceDepot.City,
            j.TargetDepot.City
        ));
    }

    public async Task<JobDetailsDto?> ReserveJobAsync(Guid jobId, CancellationToken cancellationToken = default)
    {
        var job = await _dbContext.JobOffers
            .Include(j => j.SourceDepot)
            .Include(j => j.TargetDepot)
            .FirstOrDefaultAsync(j => j.Id == jobId, cancellationToken);

        if (job == null || job.IsTaken) return null;

        job.IsTaken = true;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new JobDetailsDto(
            job.Id,
            job.SourceDepot.Location.Y,
            job.SourceDepot.Location.X,
            job.TargetDepot.Location.Y,
            job.TargetDepot.Location.X,
            job.CargoName,
            job.Revenue
        );
    }
}
