using System.Text.Json;
using CargoTrack.Modules.Logistics.Database;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
public class LogisticDataSeeder
{
    private readonly LogisticsDbContext _dbContext;
    public LogisticDataSeeder(LogisticsDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task SeedAsync()
    {
        if  (!await _dbContext.NpcCompanies.AnyAsync())
        {
            var companiesJson = await File.ReadAllTextAsync("Modules/Logistics/Data/company.json");
            var companiesDto = JsonSerializer.Deserialize<List<NpcCompanyDto>>(companiesJson);

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
            var depotsJson = await File.ReadAllTextAsync("Modules/Logistics/Data/depot.json");
            var depotsDto = JsonSerializer.Deserialize<List<DepotDto>>(depotsJson);
            
            var companyMap = await _dbContext.NpcCompanies.ToDictionaryAsync(c => c.Code, c => c.Id);

            var depots = new List<Depot>();
            foreach (var dto in depotsDto)
            {
                if (companyMap.TryGetValue(dto.CompanyId, out var realGuid))
                {
                    depots.Add(new Depot
                    {
                        Id = Guid.NewGuid(),
                        NpcCompanyId = realGuid, // Przypisujemy prawdziwy GUID z bazy
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
{var cargosJson = await File.ReadAllTextAsync("Modules/Logistics/Data/cargos.json");
    var cargosDto = JsonSerializer.Deserialize<List<CargoTypeDto>>(cargosJson);

    var cargos = cargosDto.Select(c => new CargoType
    {
        Id = Guid.NewGuid(),
        
        Code = c.Id,        
        
        Name = c.Name,
        BasePrice = c.BasePrice,
        RequiredTrailer = Enum.Parse<TrailerType>(c.RequiredTrailer)
    });

    _dbContext.CargoTypes.AddRange(cargos);
    await _dbContext.SaveChangesAsync();
}
    }
    
}