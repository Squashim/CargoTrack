using System.ComponentModel.DataAnnotations.Schema;

[Table("CargoTypes", Schema = "logistics")]
public class CargoType
{
    public Guid Id { get; set; } 

    public string Code { get; set; } 

    public string Name { get; set; }
    public decimal BasePrice { get; set; }
    
    public TrailerType RequiredTrailer { get; set; } 
}