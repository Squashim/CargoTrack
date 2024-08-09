
using Microsoft.VisualBasic;

namespace CargoTrack.Api.Helpers;

public static class AuthSettings{


#pragma warning disable CS8601 // Possible null reference assignment.
    public static readonly string PrivateKey = Environment.GetEnvironmentVariable("MY_PRIVATE_KEY");
#pragma warning restore CS8601 // Possible null reference assignment.
}