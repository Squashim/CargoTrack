using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Transport.Entities;

[Table("Drivers", Schema = "game")]
public class Driver
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }

    public string Name { get; set; } = null!;
    public decimal Salary { get; set; }
    public Guid? AssignedTruckId { get; set; }
    public bool IsDriving { get; set; } 
    public Company Company { get; set; } = null!;
    public string? ImageUrl { get; set; }
}