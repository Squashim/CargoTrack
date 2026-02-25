using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Authorize]
[Route("api/drivers")]
public class DriverController : ControllerBase
{
    private readonly IDriverService _driverService;

    public DriverController(IDriverService driverService)
    {
        _driverService = driverService;
    }

    [HttpGet]
    public async Task<IActionResult> GetDrivers()
    {
        var drivers = await _driverService.GetDriversAsync();
        return Ok(drivers);
    }
}
