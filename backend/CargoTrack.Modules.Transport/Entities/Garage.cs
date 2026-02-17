using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Transport.Entities;

[Table("Garages", Schema = "game")]
public class Garage
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }

   
    [Column(TypeName = "geography(Point, 4326)")]
    public required Point Location { get; set; }

    public required string Name { get; set; } 
    public int Slots { get; set; } 
    public int Level { get; set; }
    
    
    public required ICollection<Truck>? Trucks { get; set; } 
    public required ICollection<Trailer>? Trailers { get; set; }
}