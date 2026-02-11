using CargoTrack.Modules.Transport.Database;
using CargoTrack.Modules.Transport.Entities;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;
using NetTopologySuite.LinearReferencing;

namespace CargoTrack.Modules.Transport.Services;

public class SimulationService
{
    private readonly TransportDbContext _db;
    private readonly RouteService _routeService;

    public SimulationService(TransportDbContext db, RouteService routeService)
    {
        _db = db;
        _routeService = routeService;
    }

    public async Task<Guid> StartTransportAsync(Guid truckId, Guid userId, double startLat, double startLon, double endLat, double endLon)
    {
        var routeData = await _routeService.GetRouteAsync(startLat, startLon, endLat, endLon);

        var transport = new TransportJob
        {
            Id = Guid.NewGuid(),
            TruckId = truckId,
            UserId = userId,
            StartTime = DateTime.UtcNow,
            EstimatedArrivalTime = DateTime.UtcNow.AddSeconds(routeData.DurationSeconds),
            TotalDistanceMeters = routeData.DistanceMeters,
            RouteGeometry = routeData.Geometry,
            CurrentLocation = (Point)routeData.Geometry.StartPoint,
            IsCompleted = false
        };

        _db.Transports.Add(transport);
        await _db.SaveChangesAsync();

        return transport.Id;
    }

    public async Task UpdatePositionsAsync()
    {
        var activeJobs = await _db.Transports
            .Where(t => !t.IsCompleted)
            .ToListAsync();

        foreach (var job in activeJobs)
        {
            var now = DateTime.UtcNow;

            if (now >= job.EstimatedArrivalTime)
            {
                job.IsCompleted = true;
                var endPoint = (Point)job.RouteGeometry.EndPoint;
                job.CurrentLocation = new Point(endPoint.X, endPoint.Y) { SRID = 4326 };
                continue;
            }

            var totalTime = (job.EstimatedArrivalTime - job.StartTime).TotalSeconds;
            var elapsedTime = (now - job.StartTime).TotalSeconds;

            if (totalTime <= 0) totalTime = 1;

            double fraction = elapsedTime / totalTime;

            var length = job.RouteGeometry.Length;
            var indexedLine = new LengthIndexedLine(job.RouteGeometry);
            var pointLocation = indexedLine.ExtractPoint(fraction * length);

            var coordinate2D = new Coordinate(pointLocation.X, pointLocation.Y);
            job.CurrentLocation = new Point(coordinate2D) { SRID = 4326 };
        }

        await _db.SaveChangesAsync();
    }

    public async Task<object?> GetTransportStatus(Guid id)
    {
        var t = await _db.Transports.FindAsync(id);
        if (t == null) return null;

        return new
        {
            t.Id,
            CurrentLat = t.CurrentLocation.Y,
            CurrentLon = t.CurrentLocation.X,
            Progress = (DateTime.UtcNow - t.StartTime).TotalSeconds / (t.EstimatedArrivalTime - t.StartTime).TotalSeconds * 100
        };
    }

    public async Task<List<TruckPositionDto>> CalculateCurrentPositionsAsync()
    {
        var activeJobs = await _db.Transports.AsNoTracking()
            .Where(t => !t.IsCompleted)
            .ToListAsync();
        var positions = new List<TruckPositionDto>();
        var now = DateTime.UtcNow;

        foreach (var job in activeJobs)
        {
            if (now >= job.EstimatedArrivalTime) continue;

            var totalTime = (job.EstimatedArrivalTime - job.StartTime).TotalSeconds;
            var elapsedTime = (now - job.StartTime).TotalSeconds;
            if (totalTime <= 0) totalTime = 1;

            double fraction = elapsedTime / totalTime;
            var length = job.RouteGeometry.Length;
            var indexedLine = new LengthIndexedLine(job.RouteGeometry);
            var pointLocation = indexedLine.ExtractPoint(fraction * length);

            positions.Add(new TruckPositionDto(
                job.TruckId,
                job.UserId,
                pointLocation.Y,
                pointLocation.X,
                fraction * 100
            ));
        }
        return positions;
    }
}