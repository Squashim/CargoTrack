using CargoTrack.Modules.Transport.DTOs;

namespace CargoTrack.Modules.Transport.Interfaces;

public interface ITrailerService
{
    Task<IEnumerable<TrailerDto>> GetTrailersAsync();
}
