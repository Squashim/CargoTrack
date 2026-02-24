using CargoTrack.Contracts.Logistics.DTOs;

namespace CargoTrack.Modules.Logistics.Interfaces;

public interface IJobOfferService
{
    Task<IEnumerable<JobOfferDto>> GetJobOffersAsync(CancellationToken cancellationToken = default);
    Task<JobDetailsDto?> ReserveJobAsync(Guid jobId, CancellationToken cancellationToken = default);
}
