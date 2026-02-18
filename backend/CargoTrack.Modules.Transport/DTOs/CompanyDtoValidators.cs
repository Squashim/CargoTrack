using CargoTrack.Modules.Shared.Interfaces;
using CargoTrack.Modules.Transport.Database;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Transport.DTOs;

internal class CompanyDtoValidator : AbstractValidator<CompanyDto>
{
    public CompanyDtoValidator(TransportDbContext dbContext, IUserContext userContext)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithErrorCode("COMPANY_NAME_EMPTY")
            .MustAsync(async (name, cancellation) =>
                !await dbContext.Companies.AnyAsync(c => c.Name == name, cancellation))
            .WithErrorCode("COMPANY_NAME_TAKEN");

        RuleFor(x => x.Id)
            .MustAsync(async (_, cancellation) =>
                !await dbContext.Companies.AnyAsync(c => c.UserId == userContext.UserId, cancellation))
            .WithErrorCode("USER_ALREADY_HAS_COMPANY");

        RuleFor(x => x.Latitude)
            .Must(x => x != 0)
            .WithErrorCode("LATITUDE_EMPTY");
            
        RuleFor(x => x.Longitude)
            .Must(x => x != 0)
            .WithErrorCode("LONGITUDE_EMPTY");
    }
}
