using CargoTrack.Modules.Shared.Interfaces;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Transport.Services;

public class DriverService : IDriverService
{
    private readonly IUserContext _userContext;
    private readonly TransportDbContext _dbContext;

    public DriverService(IUserContext userContext, TransportDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<DriverDto>> GetDriversAsync()
    {
        var userId = _userContext.UserId;

        return await _dbContext.Drivers
            .Where(d => d.Company.UserId == userId)
            .Select(d => new DriverDto
            {
                Id = d.Id,
                Name = d.Name,
                Salary = d.Salary,
                AssignedTruckId = d.AssignedTruckId,
                IsDriving = d.IsDriving,
                ImageUrl = d.ImageUrl
            })
            .ToListAsync();
    }
}
