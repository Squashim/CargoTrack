using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;
[Table("company")]
public class Company
{
    [Key]
    [Column("companyid")] 
    public int Id{ get; set; }
    [Column("companyname")] 
    public required string CompanyName { get; set; }
    [Column("nip")] 
    public required string Nip { get; set; }
    [Column("userid")] 
    public int UserId { get; set; }
}