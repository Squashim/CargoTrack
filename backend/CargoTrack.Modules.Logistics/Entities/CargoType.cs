using System.ComponentModel.DataAnnotations.Schema;
using CargoTrack.Modules.Shared.Constants;

namespace CargoTrack.Modules.Logistics.Entities;

[Table("CargoTypes", Schema = "logistics")]
public class CargoType
{
    public Guid Id { get; set; } 

    public string Code { get; set; } 

    public string Name { get; set; }
    public decimal BasePrice { get; set; }
    
    public TrailerType RequiredTrailer { get; set; } 
}