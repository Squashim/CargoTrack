using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace CargoTrack.Api.Entities;

public class User
{
    [Column("userid")] public int Id { get; set; }
    [Column("name")] public required string Name { get; set; }

    [Column("surname")]
    public required string Surname { get; set; } 
    [Column("email")]
    public required string Email { get; set; }
    [Column("password")]
    public required string Password { get; set; }
    [Column("birthdate")]
    public required DateOnly Birthdate { get; set; }
    [Column("accounttypeid")]
    public required int AccountTypeId {get; set; }
    public AccountType? AccountType { get; set; }
    [Column("vehicleid")]
    public required int VehicleId { get; set; }
}
    