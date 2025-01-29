package backend.cargoTrack.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import backend.cargoTrack.repositories.UserRepository;
import backend.cargoTrack.dtos.LoginDto;
import backend.cargoTrack.dtos.RegisterDto;
import backend.cargoTrack.model.User;

@Service
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(
      UserRepository userRepository,
      AuthenticationManager authenticationManager,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public void signup(RegisterDto input) {
    User existingUserByEmail = userRepository.findByEmail(input.getEmail());
    if (existingUserByEmail != null) {
      throw new IllegalArgumentException("Użytkownik o podanym e-mailu już istnieje");
    }

    User existingUserByCompany = userRepository.findByCompanyName(input.getCompanyName());
    if (existingUserByCompany != null) {
      throw new IllegalArgumentException("Firma o podanej nazwie już istnieje");
    }

    User user = new User();
    user.setEmail(input.getEmail());
    user.setPassword(passwordEncoder.encode(input.getPassword()));
    user.setCompanyName(input.getCompanyName());

    userRepository.save(user);
  }


    public User authenticate(LoginDto input) {
      try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()));

        return userRepository.findByEmail(input.getEmail());
      } catch (BadCredentialsException e) {
        throw new IllegalArgumentException("Niepoprawny email lub haslo");
      }

  }
}
