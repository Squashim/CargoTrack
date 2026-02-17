using CargoTrack.Modules.Transport.DTOs;

namespace CargoTrack.Modules.Transport.Interfaces;

public interface ICompanyService
{
    
     Task<CompanyResponseDto> CreateCompanyAsync(CompanyDto companyDto);
    Task<CompanyResponseDto> GetCompanyAsync();
    
}