using NetTopologySuite.Geometries;

namespace CargoTrack.Modules.Transport.Entities;

public class TransportJob 
{
  public Guid Id {get; set;}

  public Guid TruckId {get; set;}

  public Guid UserId {get; set;}

  public DateTime StartTime {get;set;}

  public DateTime EstimatedArrivalTime {get; set;}

  public double TotalDistanceMeters {get; set;}

  public LineString RouteGeometry {get; set;} = null!;

  public Point CurrentLocation {get; set;} = null!;

  public bool IsCompleted {get; set;}
}

    

