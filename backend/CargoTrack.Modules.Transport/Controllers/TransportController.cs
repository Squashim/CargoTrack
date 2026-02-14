using CargoTrack.Modules.Transport.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Route("api/transport")]
public class TransportController : ControllerBase
{
    private readonly SimulationService _simulationService;

    public TransportController(SimulationService simulationService)
    {
        _simulationService = simulationService;
    }

    [HttpPost("start")]
    [Authorize]
    public async Task<IActionResult> Start([FromBody] StartTransportRequest request)
    {

        var userIdString = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized("INVALID_ACCESS");
        }

        var id = await _simulationService.StartTransportAsync(
            request.TruckId,
            userId,
            request.StartLat,
            request.StartLon,
            request.EndLat,
            request.EndLon
        );

        return Ok(new { TransportId = id });
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetStatus(Guid id)
    {
        var status = await _simulationService.GetTransportStatus(id);
        if (status == null) return NotFound();
        return Ok(status);
    }

    [HttpPost("tick")]
    public async Task<IActionResult> ManualTick()
    {
        await _simulationService.UpdatePositionsAsync();
        return Ok("Pozycje zaktualizowane");
    }
}