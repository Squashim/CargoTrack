using System.ComponentModel.DataAnnotations.Schema;

namespace CargoTrack.Modules.Logistics.Entities;

[Table("NpcCompanies", Schema = "logistics")]
public class NpcCompany
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
}