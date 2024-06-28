using CargoTrack.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/api/vechicles")]
public class VechichleController : ControllerBase{
    [HttpGet]
    [Authorize]
    public IActionResult Get(CargoTrackDbContext dbContext){
        return Ok(Results.Json(dbContext.Vehicles.ToList()));
    }
}