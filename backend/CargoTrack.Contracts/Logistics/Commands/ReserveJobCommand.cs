using CargoTrack.Contracts.Logistics.DTOs;
using MediatR;

namespace CargoTrack.Contracts.Logistics.Commands;

public record ReserveJobCommand(Guid JobId) : IRequest<JobDetailsDto?>;
