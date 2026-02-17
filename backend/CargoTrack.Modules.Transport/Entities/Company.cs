using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Transport.Entities;

[Table("Companies", Schema = "game")]
public class Company
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Color { get; set; } = "#000000";
    public Guid UserId { get; set; }
    public decimal Balance { get; set; }
    
    public int Level { get; set; } = 1; 
    public decimal Reputation { get; set; } = 1.0m;
    public DateTime CreatedAt { get; set; }
   public ICollection<Truck>? Trucks {get; set;}
   public ICollection<Driver>? Drivers {get; set;}
   public ICollection<Trailer>? Trailers {get; set;}

   public ICollection<Garage>? Garages { get; set; }
}