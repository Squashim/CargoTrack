using CargoTrack.Modules.Logistics.DTOs;
using CargoTrack.Modules.Logistics.PublicApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Logistics.Controllers;

[ApiController]
[Authorize]
[Route("api/job-offers")]
public class JobOfferController : ControllerBase

{
    private readonly ILogisticsModuleApi _logisticsModuleApi;
    public JobOfferController(ILogisticsModuleApi logisticsModuleApi)
    {
        _logisticsModuleApi = logisticsModuleApi;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobOfferDto>>> GetJobOfferAsync()
    {
        var jobOffers = await _logisticsModuleApi.GetJobsNearAsync();
        return Ok(jobOffers);
    }
}