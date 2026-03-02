using CargoTrack.Modules.Transport.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using CargoTrack.Contracts.Logistics.Commands;
using FluentValidation;
namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Route("api/transport")]
public class TransportController : ControllerBase
{
    private readonly SimulationService _simulationService;
    private readonly IMediator _mediator;
    private readonly IValidator<StartTransportRequest> _validator;
    public TransportController(SimulationService simulationService, IMediator mediator, IValidator<StartTransportRequest> validator)
    {
        _simulationService = simulationService;
        _mediator = mediator;
        _validator = validator;
    }

    [HttpPost("start")]
    [Authorize]
    public async Task<IActionResult> Start([FromBody] StartTransportRequest request)
    {
        var validationResult = await _validator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        var jobDetails = await _mediator.Send(new ReserveJobCommand(request.JobOfferId));
        if (jobDetails == null)
        {
            return BadRequest("Job details not found");
        }

        var id = await _simulationService.StartTransportAsync(
            request,
            jobDetails.SourceLat,
            jobDetails.SourceLon,
            jobDetails.TargetLat,
            jobDetails.TargetLon,
            jobDetails.Revenue
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