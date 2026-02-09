using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json.Linq;

namespace CargoTrack.Modules.Transport.Services;

public class RouteService
{
    private readonly HttpClient _httpClient;
    private readonly string _osrmUrl;

    public RouteService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _osrmUrl = configuration["OsrmUrl"] ?? "http://localhost:5001";
    }

    public async Task<(LineString Geometry, double DistanceMeters, double DurationSeconds)> GetRouteAsync(double startLat, double startLon, double endLat, double endLon)
    {
        var culture = System.Globalization.CultureInfo.InvariantCulture;

        var coordinates = $"{startLon.ToString(culture)},{startLat.ToString(culture)};{endLon.ToString(culture)},{endLat.ToString(culture)}";

        var url = $"{_osrmUrl}/route/v1/driving/{coordinates}?overview=full&geometries=geojson";


        var response = await _httpClient.GetAsync(url);

        var json = await response.Content.ReadAsStringAsync();


        if (!response.IsSuccessStatusCode)
            throw new Exception($"Błąd OSRM: {response.StatusCode} - {json}");

        var data = JObject.Parse(json);

        var route = data["routes"]?[0];
        if (route == null) throw new Exception("Nie znaleziono trasy!");

        double distance = route["distance"]?.Value<double>() ?? 0;
        double duration = route["duration"]?.Value<double>() ?? 0;

        var geometryJson = route["geometry"]?.ToString();
        var reader = new GeoJsonReader();
        var geometry = reader.Read<LineString>(geometryJson);
        geometry.SRID = 4326;

        return (geometry, distance, duration);
    }

}