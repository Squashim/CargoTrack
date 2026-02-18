using NetTopologySuite.Geometries;
namespace CargoTrack.Modules.Transport.DTOs;
public record CompanyDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Color { get; init; } = "#000000";
    public double Latitude { get; init; }
    public double Longitude { get; init; }
}

public record CompanyResponseDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = null!;
    public string Color { get; init; } = "#000000";
    public Point? Location { get; init; }
    public decimal Balance { get; init; }
    public int Level { get; init; }
    public decimal Reputation { get; init; }
    public DateTime CreatedAt { get; init; }
}