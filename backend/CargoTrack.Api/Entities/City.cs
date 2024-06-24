using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;

[Table("city")]
public class City
{
    [Key]
    [Column("cityid")]
    public int CityId { get; set; }
        
    [Column("name")]
    public required string Name { get; set; }
}
