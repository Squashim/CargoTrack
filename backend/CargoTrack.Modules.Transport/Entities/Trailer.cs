using CargoTrack.Modules.Shared.Constants;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Transport.Entities;


[Table("Trailers", Schema = "game")]
public class Trailer
{public Guid Id { get; set; }
    public Guid CompanyId { get; set; } 

    public Guid? AttachedTruckId { get; set; } 
    public required Truck? AttachedTruck { get; set; }
    public Company Company { get; set; } = null!;
    public TrailerType Type { get; set; } 
    public double CargoCapacityKg { get; set; } 
    public double Condition { get; set; } 
    
    public string ModelName { get; set; } = string.Empty; 
    public Guid GarageId { get; set; }
    public string? ImageUrl { get; set; }
}

