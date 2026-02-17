namespace CargoTrack.Modules.Transport.Services;

using Microsoft.EntityFrameworkCore;
using CargoTrack.Modules.Shared.Services;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.Domain;
using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using CargoTrack.Modules.Shared.Interfaces;

public class CompanyService : ICompanyService
{
    private readonly CompanyFactory _companyFactory; 
    private readonly IUserContext   _userContext;
    private readonly TransportDbContext _dbContext;
    public CompanyService(CompanyFactory companyFactory, IUserContext userContext, TransportDbContext dbContext)
    {
        _companyFactory = companyFactory;
        _userContext = userContext;
        _dbContext = dbContext;
    }
    public async Task<CompanyResponseDto> CreateCompanyAsync(CompanyDto companyDto)
    {
        var userId = _userContext.UserId;

        if (await _dbContext.Companies.AnyAsync(c => c.UserId == userId))
        {
            throw new InvalidOperationException("USER_ALREADY_HAS_COMPANY");
        }

        if (companyDto.Latitude == 0 && companyDto.Longitude == 0)
        {
            throw new ArgumentException("LOCATION_EMPTY", nameof(companyDto));
        }

        var (company, garage, truck, trailer, driver) = _companyFactory.CreateStarterPack(
            userId, companyDto.Name, companyDto.Color, companyDto.Latitude, companyDto.Longitude
        );

        _dbContext.Companies.Add(company);
        _dbContext.Garages.Add(garage);
        _dbContext.Trucks.Add(truck);
        _dbContext.Trailers.Add(trailer);
        _dbContext.Drivers.Add(driver);

        await _dbContext.SaveChangesAsync();

        return new CompanyResponseDto
        {
            Id = company.Id,
            Name = company.Name,
            Color = company.Color,
            Balance = company.Balance,
            Location = company.Garages?.FirstOrDefault()?.Location,
            Level = company.Level,
            Reputation = company.Reputation,
            CreatedAt = company.CreatedAt
        };
    }

    public async Task<CompanyResponseDto> GetCompanyAsync()
    {
        var userId = _userContext.UserId;

        var company = await _dbContext.Companies
            .Include(c => c.Garages)
            .FirstOrDefaultAsync(c => c.UserId == userId);

        if (company == null)
        {
            throw new InvalidOperationException("COMPANY_NOT_FOUND");
        }

        return new CompanyResponseDto
        {
            Id = company.Id,
            Name = company.Name,
            Color = company.Color,
            Balance = company.Balance,
            Location = company.Garages?.FirstOrDefault()?.Location,
            Level = company.Level,
            Reputation = company.Reputation,
            CreatedAt = company.CreatedAt
        };
    }
}