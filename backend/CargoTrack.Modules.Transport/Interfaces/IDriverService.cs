using CargoTrack.Modules.Transport.DTOs;

namespace CargoTrack.Modules.Transport.Interfaces;

public interface IDriverService
{
    Task<IEnumerable<DriverDto>> GetDriversAsync();
}
