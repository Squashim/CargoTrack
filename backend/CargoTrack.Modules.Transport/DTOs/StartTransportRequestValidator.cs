using CargoTrack.Modules.Transport.Database;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Transport.DTOs;

internal class StartTransportRequestValidator : AbstractValidator<StartTransportRequest>
{
    public StartTransportRequestValidator(TransportDbContext dbContext)
    {
        RuleFor(x => x.TruckId)
            .NotEmpty()
            .WithErrorCode("TRUCK_ID_EMPTY")
            .MustAsync(async (id, ct) =>
                await dbContext.Trucks.AnyAsync(t => t.Id == id, ct))
            .WithErrorCode("TRUCK_NOT_FOUND")
            .MustAsync(async (id, ct) =>
            {
                var truck = await dbContext.Trucks.FindAsync([id], ct);
                return truck is not null && !truck.IsDriving;
            })
            .WithErrorCode("TRUCK_ALREADY_DRIVING");

        RuleFor(x => x.DriverId)
            .NotEmpty()
            .WithErrorCode("DRIVER_ID_EMPTY")
            .MustAsync(async (id, ct) =>
                await dbContext.Drivers.AnyAsync(d => d.Id == id, ct))
            .WithErrorCode("DRIVER_NOT_FOUND")
            .MustAsync(async (id, ct) =>
            {
                var driver = await dbContext.Drivers.FindAsync([id], ct);
                return driver is not null && !driver.IsDriving;
            })
            .WithErrorCode("DRIVER_ALREADY_DRIVING");

        RuleFor(x => x.TrailerId)
            .NotEmpty()
            .WithErrorCode("TRAILER_ID_EMPTY")
            .MustAsync(async (id, ct) =>
                await dbContext.Trailers.AnyAsync(t => t.Id == id, ct))
            .WithErrorCode("TRAILER_NOT_FOUND");

        RuleFor(x => x.JobOfferId)
            .NotEmpty()
            .WithErrorCode("JOB_OFFER_ID_EMPTY");
    }
}
