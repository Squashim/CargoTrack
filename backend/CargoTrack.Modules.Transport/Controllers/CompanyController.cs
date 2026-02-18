using CargoTrack.Modules.Transport.DTOs;
using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Authorize]
[Route("api/company")]
public class CompanyController : ControllerBase
{
    private readonly ICompanyService _companyService;
    
    public CompanyController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCompany([FromBody] CompanyDto companyDto)
    {
        var createdCompany = await _companyService.CreateCompanyAsync(companyDto);
        Console.WriteLine($"Firma stworzona: {createdCompany} dla usera");
        return Ok(createdCompany);
    }

    [HttpGet]
    public async Task<IActionResult> GetCompany()
    {
        
        var company = await _companyService.GetCompanyAsync();
        Console.WriteLine($"Pobieranie firmy dla usera, znaleziono: {company?.Name}");
        if (company == null)
        {
            return NotFound("Nie znaleziono firmy");
        }
        return Ok(company);
    }
    
}