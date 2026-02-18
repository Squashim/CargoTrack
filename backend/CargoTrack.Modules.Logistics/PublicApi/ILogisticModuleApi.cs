using CargoTrack.Modules.Logistics.DTOs;

namespace CargoTrack.Modules.Logistics.PublicApi; 

public interface ILogisticsModuleApi
{
    Task<IEnumerable<JobOfferDto>> GetJobsNearAsync();
    
    Task<JobDetailsDto?> ReserveJobAsync(Guid jobId);
}