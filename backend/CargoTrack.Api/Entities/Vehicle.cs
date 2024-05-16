using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;
[Table("vehicle")]
public class Vehicle
{
    [Key]
    [Column("vechicleid")] 
    public int VehicleId { get; set; }
    [Column("mark")] 
    public required string Mark { get; set; }
    [Column("model")] 
    public required string Model { get; set; }
    [Column("productiondate")] 
    public DateOnly ProductionDate { get; set; }
    [Column("vin")] 
    public required string Vin { get; set; }
}