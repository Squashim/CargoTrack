namespace CargoTrack.Modules.Transport.Services;

using Microsoft.EntityFrameworkCore;
using CargoTrack.Modules.Shared.Services;
using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.Domain;
using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using CargoTrack.Modules.Shared.Interfaces;
using FluentValidation;

public class CompanyService : ICompanyService
{
    private readonly CompanyFactory _companyFactory; 
    private readonly IUserContext   _userContext;
    private readonly TransportDbContext _dbContext;
    private readonly IValidator<CompanyDto> _companyValidator;
    public CompanyService(CompanyFactory companyFactory, IUserContext userContext, TransportDbContext dbContext, IValidator<CompanyDto> companyValidator)
    {
        _companyFactory = companyFactory;
        _userContext = userContext;
        _dbContext = dbContext;
        _companyValidator = companyValidator;
    }
    public async Task<CompanyResponseDto> CreateCompanyAsync(CompanyDto companyDto)
    {
        var validationResult = await _companyValidator.ValidateAsync(companyDto);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var userId = _userContext.UserId;

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