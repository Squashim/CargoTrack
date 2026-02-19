using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using CargoTrack.Modules.Transport.Services;

namespace CargoTrack.Modules.Transport.Hubs;

[Authorize]
public class SimulationHub : Hub
{
    private readonly ConnectionTrackerService _connectionTracker;

    public SimulationHub(ConnectionTrackerService connectionTracker)
    {
        _connectionTracker = connectionTracker;
    }

    public override async Task OnConnectedAsync()
    {
        _connectionTracker.IncrementConnections();
        
        var userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            var groupName = $"User_{userId}";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        _connectionTracker.DecrementConnections();
        await base.OnDisconnectedAsync(exception);
    }
}