using CargoTrack.Modules.Shared.Interfaces;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Transport.Services;

public class TrailerService : ITrailerService
{
    private readonly IUserContext _userContext;
    private readonly TransportDbContext _dbContext;

    public TrailerService(IUserContext userContext, TransportDbContext dbContext)
    {
        _userContext = userContext;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TrailerDto>> GetTrailersAsync()
    {
        var userId = _userContext.UserId;

        return await _dbContext.Trailers
            .Where(t => t.Company.UserId == userId)
            .Select(t => new TrailerDto
            {
                Id = t.Id,
                ModelName = t.ModelName,
                CargoCapacityKg = t.CargoCapacityKg,
                Condition = t.Condition,
                Type = t.Type
            })
            .ToListAsync();
    }
}
