namespace CargoTrack.Modules.Transport.Services;

public class ConnectionTrackerService
{
    private int _activeConnections = 0;
    private readonly object _lock = new object();

    public void IncrementConnections()
    {
        lock (_lock)
        {
            _activeConnections++;
        }
    }

    public void DecrementConnections()
    {
        lock (_lock)
        {
            _activeConnections = Math.Max(0, _activeConnections - 1);
        }
    }

    public bool HasActiveConnections()
    {
        lock (_lock)
        {
            return _activeConnections > 0;
        }
    }

    public int GetActiveConnectionsCount()
    {
        lock (_lock)
        {
            return _activeConnections;
        }
    }
}
