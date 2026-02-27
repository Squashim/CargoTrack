using CargoTrack.Modules.Shared.Interfaces;

namespace CargoTrack.Modules.Shared.Services;

public class LocalFileStorageService : IFileStorageService
{
    private readonly string _rootPath;
    private readonly string _baseUrl;

    public LocalFileStorageService(string webRootPath, string baseUrl = "/")
    {
        _rootPath = Path.Combine(webRootPath, "uploads");
        _baseUrl = baseUrl.TrimEnd('/');
        Directory.CreateDirectory(_rootPath);
    }

    public async Task<string> UploadAsync(Stream stream, string fileName, string folder, CancellationToken ct = default)
    {
        var folderPath = Path.Combine(_rootPath, folder);
        Directory.CreateDirectory(folderPath);

        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var uniqueName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(folderPath, uniqueName);

        await using var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write);
        await stream.CopyToAsync(fileStream, ct);

        return $"uploads/{folder}/{uniqueName}";
    }

    public Task DeleteAsync(string relativePath, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(relativePath))
            return Task.CompletedTask;

        var fullPath = Path.Combine(Path.GetDirectoryName(_rootPath)!, relativePath);
        if (File.Exists(fullPath))
            File.Delete(fullPath);

        return Task.CompletedTask;
    }

    public string GetUrl(string relativePath)
    {
        if (string.IsNullOrWhiteSpace(relativePath))
            return string.Empty;

        return $"{_baseUrl}/{relativePath}";
    }
}
