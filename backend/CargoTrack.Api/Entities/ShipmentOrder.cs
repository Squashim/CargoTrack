using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;
[Table("shipmentorder")]
public class ShipmentOrder
{
    [Key]
    [Column("shipmentid")] 
    public int ShipmentId { get; set; }
    [Column("name")] 
    public required string Name { get; set; }
    [Column("shipmentstart")] 
    public DateTime ShipmentStart { get; set; }
    [Column("shipmentEnd")] 
    public DateTime ShipmentEnd { get; set; }
    [Column("price")] 
    public double Price { get; set; }
    [Column("adresid")] 
    public int AdresId { get; set; }
    [Column("shipmentstatusid")] 
    public int ShipmentStatusId { get; set; }
    [Column("companyid")] 
    public int CompanyId { get; set; }
}