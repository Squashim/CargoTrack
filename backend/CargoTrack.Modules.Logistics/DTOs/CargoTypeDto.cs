namespace CargoTrack.Modules.Logistics.DTOs;

public class CargoTypeDto 
{
    public string Id { get; set; }
    public string Name { get; set; }
    public decimal BasePrice { get; set; }
    public string RequiredTrailer { get; set; }
    public string? ImageUrl { get; set; }
}