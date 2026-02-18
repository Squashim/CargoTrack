using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Authorize]
[Route("api/trucks")]
public class TruckController : ControllerBase
{
    private readonly ITruckService _truckService;
    public TruckController(ITruckService truckService)
    {
        _truckService = truckService;
    }
    
    [HttpGet]
    public IActionResult GetTrucks()
    {
        var trucks = _truckService.GetTrucksAsync().Result;
        return Ok(trucks);
        
    }
    }