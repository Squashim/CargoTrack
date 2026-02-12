using CargoTrack.Modules.Identity.Database;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CargoTrack.Modules.Identity.DTOs;

internal class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator(IdentityDbContext dbContext)
    {
        RuleFor(x => x.Email).NotEmpty().WithErrorCode("EMAIL_EMPTY")
        .EmailAddress().WithErrorCode("EMAIL_INVALID")
        .MustAsync(async (email, cancelation) => !await dbContext.Users.AnyAsync(u => u.Email == email, cancelation))
        .WithErrorCode("EMAIL_TAKEN");

        RuleFor(x => x.Password).NotEmpty().WithErrorCode("PASSWORD_EMPTY")
        .MinimumLength(8).WithErrorCode("PASSWORD_LENGTH")
        .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
        .WithErrorCode("PASSWORD_WEAK");

        RuleFor(x => x.UserName).NotEmpty().WithErrorCode("USERNAME_EMPTY")
        .MinimumLength(3).WithErrorCode("USERNAME_LENGTH")
        .MustAsync(async (userName, cancelation) => !await dbContext.Users.AnyAsync(u => u.UserName == userName, cancelation))
        .WithErrorCode("USERNAME_TAKEN");
    }

}

internal class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithErrorCode("EMAIL_EMPTY")
        .EmailAddress().WithErrorCode("EMAIL_INVALID");

        RuleFor(x => x.Password).NotEmpty().WithErrorCode("PASSWORD_EMPTY");
    }
}
