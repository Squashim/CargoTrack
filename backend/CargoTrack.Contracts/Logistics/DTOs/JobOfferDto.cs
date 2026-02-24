namespace CargoTrack.Contracts.Logistics.DTOs;

public record JobOfferDto(
    Guid Id,
    string CargoName,
    string RequiredTrailer,
    double WeightTons,
    decimal Revenue,
    double DistanceKm,
    string SourceCity,
    string TargetCity
);

public record JobDetailsDto(
    Guid Id,
    double SourceLat, double SourceLon,
    double TargetLat, double TargetLon,
    string CargoName,
    decimal Revenue
);
