using CargoTrack.Modules.Transport.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CargoTrack.Modules.Transport.BackgroundJobs;

public class TransportSimulationWorker : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IHubContext<SimulationHub> _hubContext;

    public TransportSimulationWorker(IServiceProvider serviceProvider, IHubContext<SimulationHub> hubContext)
    {
        _serviceProvider = serviceProvider;
        _hubContext = hubContext;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
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