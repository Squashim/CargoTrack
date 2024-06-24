using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities
{
    [Table("adres")]
    public class Adres
    {
        [Key]
        [Column("adresid")]
        public int Id { get; set; }
        
        [Column("streetname")]
        public required string StreetName { get; set; }
        
        [Column("housenubmer")]
        public int HouseNumber { get; set; }
        
        [Column("postalcode")]
        public required string PostalCode { get; set; }
        
        [Column("cityid")]
        public int CityId { get; set; }
    }
}