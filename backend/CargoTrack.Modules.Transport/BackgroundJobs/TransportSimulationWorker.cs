using CargoTrack.Modules.Transport.Hubs;
using CargoTrack.Modules.Transport.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace CargoTrack.Modules.Transport.BackgroundJobs;

public class TransportSimulationWorker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IHubContext<SimulationHub> _hubContext;
    private readonly ConnectionTrackerService _connectionTracker;
    private readonly ILogger<TransportSimulationWorker> _logger;

    public TransportSimulationWorker(
        IServiceProvider serviceProvider, 
        IHubContext<SimulationHub> hubContext,
        ConnectionTrackerService connectionTracker,
        ILogger<TransportSimulationWorker> logger)
    {
        _serviceProvider = serviceProvider;
        _hubContext = hubContext;
        _connectionTracker = connectionTracker;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("TransportSimulationWorker uruchomiony.");

        while (!stoppingToken.IsCancellationRequested)
        {
            if (!_connectionTracker.HasActiveConnections())
            {
                await Task.Delay(1000, stoppingToken);
                continue;
            }

            using (var scope = _serviceProvider.CreateScope())
            {
                var simulationService = scope.ServiceProvider.GetRequiredService<Services.SimulationService>();

                var positions = await simulationService.CalculateCurrentPositionsAsync();
                if (positions.Any())
                {
                    foreach (var userGroup in positions.GroupBy(p => p.UserId))
                    {
                        var groupName = $"User_{userGroup.Key}";
                        await _hubContext.Clients.Group(groupName)
                            .SendAsync("ReceivePositions", userGroup.ToList(), stoppingToken);
                    }
                }

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}