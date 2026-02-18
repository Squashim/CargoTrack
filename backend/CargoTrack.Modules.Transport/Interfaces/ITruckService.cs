namespace CargoTrack.Modules.Transport.Interfaces;

using CargoTrack.Modules.Transport.DTOs;

public interface ITruckService
{
    Task<IEnumerable<TruckDto>> GetTrucksAsync();
    
}