using CargoTrack.Modules.Shared.Constants;

namespace CargoTrack.Modules.Transport.DTOs;

public record TrailerDto
{
    public Guid Id { get; init; }
    public string ModelName { get; init; } = string.Empty;
    public double CargoCapacityKg { get; init; }
    public double Condition { get; init; }
    public TrailerType Type { get; init; }
    public string? ImageUrl { get; init; }
}