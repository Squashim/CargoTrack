using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Api.Entities;

[Table("accounttype")]
public class AccountType
{
    [Column("accounttypeid")]
    public int Id { get; set; }
    [Column("name")]
    public required string Name { get; set; }

}
