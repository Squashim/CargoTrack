using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Transport.Entities;

[Table("Trucks", Schema = "game")]
public class Truck
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }

    public string Model { get; set; } = null!;
    public string LicensePlate { get; set; } = null!;
    public decimal Odometer { get; set; }
    public decimal Fuel { get; set; }
    public decimal MaxFuel { get; set; }
    public bool IsDriving { get; set; } 

    public int ProductionYear { get; set; }

    public decimal Condition { get; set; }

    public Company Company { get; set; } = null!;
    
    public Trailer? CurrentTrailer { get; set; }
    public Guid GarageId { get; set; }
    public string? ImageUrl { get; set; }
}