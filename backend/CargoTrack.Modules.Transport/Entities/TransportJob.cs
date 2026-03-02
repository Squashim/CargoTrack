using NetTopologySuite.Geometries;

namespace CargoTrack.Modules.Transport.Entities;

public class TransportJob 
{
  public Guid Id { get; set; }

  public Guid TruckId { get; set; }
  public Truck Truck { get; set; } = null!;

  public Guid DriverId { get; set; }
  public Driver Driver { get; set; } = null!;

  public Guid TrailerId { get; set; }
  public Trailer Trailer { get; set; } = null!;

  public Guid CompanyId { get; set; }
  public Company Company { get; set; } = null!;

  public Guid JobOfferId { get; set; }

  public decimal Revenue { get; set; }

  public DateTime StartTime { get; set; }

  public DateTime EstimatedArrivalTime { get; set; }

  public double TotalDistanceMeters { get; set; }

  public LineString RouteGeometry { get; set; } = null!;

  public Point CurrentLocation { get; set; } = null!;

  public bool IsCompleted { get; set; }
}
