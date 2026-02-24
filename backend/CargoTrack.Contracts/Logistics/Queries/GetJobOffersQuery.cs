using CargoTrack.Contracts.Logistics.DTOs;
using MediatR;

namespace CargoTrack.Contracts.Logistics.Queries;

public record GetJobOffersQuery() : IRequest<IEnumerable<JobOfferDto>>;
