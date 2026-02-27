namespace CargoTrack.Modules.Shared.Interfaces;

public interface IFileStorageService
{
    /// <summary>
    /// Uploads a file and returns the relative path (e.g. "uploads/trucks/abc.jpg").
    /// </summary>
    Task<string> UploadAsync(Stream stream, string fileName, string folder, CancellationToken ct = default);

    /// <summary>
    /// Deletes a file by its relative path.
    /// </summary>
    Task DeleteAsync(string relativePath, CancellationToken ct = default);

    /// <summary>
    /// Returns the public URL for a given relative path.
    /// </summary>
    string GetUrl(string relativePath);
}
