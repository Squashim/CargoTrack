using System.Text.Json;
using CargoTrack.Modules.Logistics.Database;
using CargoTrack.Modules.Logistics.Entities;
using CargoTrack.Modules.Logistics.DTOs;
using CargoTrack.Modules.Logistics.Constants;
using CargoTrack.Modules.Shared.Constants;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace CargoTrack.Modules.Logistics.Services;

public class LogisticDataSeeder
{
    private readonly LogisticsDbContext _dbContext;
    private readonly string _basePath;
    
    public LogisticDataSeeder(LogisticsDbContext dbContext)
    {
        _dbContext = dbContext;
        _basePath = AppContext.BaseDirectory;
    }
    
    public async Task SeedAsync()
    {
        var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        
        if  (!await _dbContext.NpcCompanies.AnyAsync())
        {
            var companiesJson = await File.ReadAllTextAsync(Path.Combine(_basePath, "Modules/Logistics/Data/company.json"));
            var companiesDto = JsonSerializer.Deserialize<List<NpcCompanyDto>>(companiesJson, jsonOptions);
            if (companiesDto == null) return;

            var companies = companiesDto.Select(c => new NpcCompany
            {
                Id = Guid.NewGuid(),
                Code = c.Id,
                Name = c.Name,
                Industry = c.Industry
            });
            await _dbContext.NpcCompanies.AddRangeAsync(companies);
            await _dbContext.SaveChangesAsync();
        }

        if (!await _dbContext.Depots.AnyAsync())
        {
            var depotsJson = await File.ReadAllTextAsync(Path.Combine(_basePath, "Modules/Logistics/Data/depot.json"));
            var depotsDto = JsonSerializer.Deserialize<List<DepotDto>>(depotsJson, jsonOptions);
            if (depotsDto == null) return;
            
            var companyMap = await _dbContext.NpcCompanies.ToDictionaryAsync(c => c.Code, c => c.Id);

            var depots = new List<Depot>();
            foreach (var dto in depotsDto)
            {
                if (companyMap.TryGetValue(dto.CompanyId, out var realGuid))
                {
                    depots.Add(new Depot
                    {
                        Id = Guid.NewGuid(),
                        NpcCompanyId = realGuid, 
                        City = dto.City,
                        Type = Enum.Parse<DepotType>(dto.Type),
                        Location = new Point(dto.Longitude, dto.Latitude) { SRID = 4326 }
                    });
                }
            }
    
            
            await _dbContext.Depots.AddRangeAsync(depots);
            await _dbContext.SaveChangesAsync();
        }

        if (!await _dbContext.CargoTypes.AnyAsync())
        {
            var cargosJson = await File.ReadAllTextAsync(Path.Combine(_basePath, "Modules/Logistics/Data/cargos.json"));
            var cargosDto = JsonSerializer.Deserialize<List<CargoTypeDto>>(cargosJson, jsonOptions);
            if (cargosDto == null) return;

            var cargos = cargosDto.Select(c => new CargoType
            {
                Id = Guid.NewGuid(),
                Code = c.Id,
                Name = c.Name,
                BasePrice = c.BasePrice,
                RequiredTrailer = Enum.Parse<TrailerType>(c.RequiredTrailer),
                ImageUrl = c.ImageUrl
            });

            _dbContext.CargoTypes.AddRange(cargos);
            await _dbContext.SaveChangesAsync();
        }
    }
}