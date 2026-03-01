namespace CargoTrack.Modules.Shared.Interfaces;

public interface IFileStorageService
{
  
    Task<string> UploadAsync(Stream stream, string fileName, string folder, CancellationToken ct = default);

    Task DeleteAsync(string relativePath, CancellationToken ct = default);

 
    string GetUrl(string relativePath);
}
