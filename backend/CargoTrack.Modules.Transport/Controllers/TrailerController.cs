using CargoTrack.Modules.Transport.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Transport.Controllers;

[ApiController]
[Authorize]
[Route("api/trailers")]
public class TrailerController : ControllerBase
{
    private readonly ITrailerService _trailerService;

    public TrailerController(ITrailerService trailerService)
    {
        _trailerService = trailerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTrailers()
    {
        var trailers = await _trailerService.GetTrailersAsync();
        return Ok(trailers);
    }
}
