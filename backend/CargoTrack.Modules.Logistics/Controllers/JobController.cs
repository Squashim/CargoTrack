using CargoTrack.Contracts.Logistics.DTOs;
using CargoTrack.Modules.Logistics.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargoTrack.Modules.Logistics.Controllers;

[ApiController]
[Authorize]
[Route("api/job-offers")]
public class JobOfferController : ControllerBase
{
    private readonly IJobOfferService _jobOfferService;

    public JobOfferController(IJobOfferService jobOfferService)
    {
        _jobOfferService = jobOfferService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobOfferDto>>> GetJobOfferAsync()
    {
        var jobOffers = await _jobOfferService.GetJobOffersAsync();
        return Ok(jobOffers);
    }
}