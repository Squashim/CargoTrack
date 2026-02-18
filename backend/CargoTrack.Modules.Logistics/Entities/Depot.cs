using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing;

[Table("Depots", Schema = "logistics")]
public class Depot
{
    public Guid Id { get; set; }
    public Guid NpcCompanyId { get; set; }
    public NpcCompany NpcCompany { get; set; } = null!;
    [Column(TypeName = "geometry(Point, 4326)")]
    public Point Location { get; set; } 
    public string Name { get; set; } = string.Empty;
    public DepotType Type { get; set; }

}