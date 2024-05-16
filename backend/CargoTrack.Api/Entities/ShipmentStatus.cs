using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;

[Table("shipmentstatus")]
public class ShipmentStatus
{
    [Key]
    [Column("shipmentstatusid")] 
    public int ShipmentStatusId { get; set; }
    [Column("shipmentstatusname")] 
    public required string ShipmentStatusName { get; set; }

}