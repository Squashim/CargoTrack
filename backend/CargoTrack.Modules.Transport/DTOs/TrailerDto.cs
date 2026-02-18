
namespace CargoTrack.Modules.Transport.DTOs;

public record TrailerDto
{
    public string ModelName { get; init; } = string.Empty;
    public double CargoCapacityKg { get; init; }
    public double Condition { get; init; }
    public TrailerType Type { get; init; }
}