using System.ComponentModel.DataAnnotations.Schema;

[Table("JobOffers", Schema = "logistics")]
public class JobOffer
{
    public Guid Id { get; set; }
    
    // Skąd - Dokąd
    public Guid SourceDepotId { get; set; }
    public Depot SourceDepot { get; set; } = null!;
    
    public Guid TargetDepotId { get; set; }
    public Depot TargetDepot { get; set; } = null!;

    public string CargoName { get; set; } = string.Empty;
    public double WeightTons { get; set; }
    public decimal Revenue { get; set; } 
    public double DistanceKm { get; set; }
    
    public bool IsTaken { get; set; } 
    public DateTime ExpiresAt { get; set; }
}