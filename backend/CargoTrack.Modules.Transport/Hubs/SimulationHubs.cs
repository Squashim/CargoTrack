using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

namespace CargoTrack.Modules.Transport.Hubs;

[Authorize]
public class SimulationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        var userId = Context.UserIdentifier;
        if (!string.IsNullOrEmpty(userId))
        {
            var groupName = $"User_{userId}";
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        await base.OnConnectedAsync();
    }
}