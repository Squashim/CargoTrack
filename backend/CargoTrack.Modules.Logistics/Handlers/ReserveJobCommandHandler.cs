using CargoTrack.Contracts.Logistics.Commands;
using CargoTrack.Contracts.Logistics.DTOs;
using CargoTrack.Modules.Logistics.Interfaces;
using MediatR;

namespace CargoTrack.Modules.Logistics.Handlers;

public class ReserveJobCommandHandler : IRequestHandler<ReserveJobCommand, JobDetailsDto?>
{
    private readonly IJobOfferService _jobOfferService;

    public ReserveJobCommandHandler(IJobOfferService jobOfferService)
    {
        _jobOfferService = jobOfferService;
    }

    public async Task<JobDetailsDto?> Handle(ReserveJobCommand request, CancellationToken cancellationToken)
    {
        return await _jobOfferService.ReserveJobAsync(request.JobId, cancellationToken);
    }
}
