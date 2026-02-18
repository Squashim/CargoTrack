using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using CargoTrack.Modules.Logistics.Database;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Logistics.Services;

public class JobGenerationWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<JobGenerationWorker> _logger;
    
    private readonly TimeSpan _period = TimeSpan.FromMinutes(15); 

    public JobGenerationWorker(IServiceScopeFactory scopeFactory, ILogger<JobGenerationWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("JobGenerationWorker: Startuje symulacja rynku...");

    await DoWorkAsync();

        using var timer = new PeriodicTimer(_period);

        while (await timer.WaitForNextTickAsync(stoppingToken) && !stoppingToken.IsCancellationRequested)
        {
            try
            {
                await DoWorkAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Błąd podczas generowania zleceń!");
            }
        }
    }

    private async Task DoWorkAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<LogisticsDbContext>();
        var generator = scope.ServiceProvider.GetRequiredService<JobGeneratorService>();

        var oldJobs = await dbContext.JobOffers
            .Where(j => !j.IsTaken && j.ExpiresAt < DateTime.UtcNow)
            .ToListAsync();

        if (oldJobs.Any())
        {
            dbContext.JobOffers.RemoveRange(oldJobs);
            _logger.LogInformation($"Usunięto {oldJobs.Count} przeterminowanych zleceń.");
        }

        var currentCount = await dbContext.JobOffers.CountAsync(j => !j.IsTaken);
        var targetCount = 50; 

        if (currentCount < targetCount)
        {
            var needed = targetCount - currentCount;
            await generator.GenerateJobs(needed);
            _logger.LogInformation($"Wygenerowano {needed} nowych zleceń.");
        }
        
        await dbContext.SaveChangesAsync();
    }
}