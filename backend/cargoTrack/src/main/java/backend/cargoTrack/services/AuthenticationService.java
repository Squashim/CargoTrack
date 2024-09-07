package backend.cargoTrack.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import backend.cargoTrack.repositories.UserRepositories;
import backend.cargoTrack.dtos.LoginDto;
import backend.cargoTrack.dtos.RegisterDto;
import backend.cargoTrack.model.User;

@Service
public class AuthenticationService {

  private final UserRepositories userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(
      UserRepositories userRepository,
      AuthenticationManager authenticationManager,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public User signup(RegisterDto input) {

    User existingUser = userRepository.findByEmail(input.getEmail());
    if (existingUser != null) {
      throw new IllegalStateException("User already exists with email: " + input.getEmail());
    }

    User user = new User();
    user.setEmail(input.getEmail());
    user.setPassword(passwordEncoder.encode(input.getPassword())); // Encode password before saving
    user.setCompanyName(input.getCompanyName());

    return userRepository.save(user);
  }

  public User authenticate(LoginDto input) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            input.getEmail(),
            input.getPassword()));
    System.out.println(input.getEmail());
    return userRepository.findByEmail(input.getEmail());
  }
}
