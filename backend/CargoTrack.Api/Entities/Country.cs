using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;
[Table("country")]
public class Country
{
    [Key]
    [Column("countryid")] 
    public int Id { get; set; }
    [Column("countryname")] 
    public required string CountryName { get; set; }
}