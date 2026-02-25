using CargoTrack.Contracts.Logistics.DTOs;
using CargoTrack.Contracts.Logistics.Queries;
using CargoTrack.Modules.Logistics.Interfaces;
using MediatR;

namespace CargoTrack.Modules.Logistics.Handlers;

public class GetJobOffersQueryHandler : IRequestHandler<GetJobOffersQuery, IEnumerable<JobOfferDto>>
{
    private readonly IJobOfferService _jobOfferService;

    public GetJobOffersQueryHandler(IJobOfferService jobOfferService)
    {
        _jobOfferService = jobOfferService;
    }

    public async Task<IEnumerable<JobOfferDto>> Handle(GetJobOffersQuery request, CancellationToken cancellationToken)
    {
        return await _jobOfferService.GetJobOffersAsync(cancellationToken);
    }
}
