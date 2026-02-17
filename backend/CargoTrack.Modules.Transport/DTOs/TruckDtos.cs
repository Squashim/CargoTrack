namespace CargoTrack.Modules.Transport.DTOs;

public record TruckDto
{
    public string Model { get; init; } = string.Empty;
    public int ProductionYear { get; init; }
    public decimal Odometer { get; init; }
    public decimal Condition { get; init; }

    public string LicensePlate { get; init; } = string.Empty;

    public bool IsDriving { get; init; }
    public decimal Fuel { get; init; }
    public decimal MaxFuel { get; init; }

    public TrailerDto? AttachedTrailer { get; init; }
}