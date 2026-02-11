using CargoTrack.Modules.Identity.Database;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Identity.DTOs;

internal class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator(IdentityDbContext dbContext)
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress()
        .MustAsync(async (email, cancelation) => !await dbContext.Users.AnyAsync(u => u.Email == email, cancelation))
        .WithMessage("Email is already in use.");

        RuleFor(x => x.Password).NotEmpty().MinimumLength(8).Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .WithMessage("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");

        RuleFor(x => x.UserName).NotEmpty().MinimumLength(3).MustAsync(async (userName, cancelation) => !await dbContext.Users.AnyAsync(u => u.UserName == userName, cancelation))
        .WithMessage("Username is already in use.");
    }

}

internal class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}
