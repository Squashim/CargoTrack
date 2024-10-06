package backend.cargoTrack.controllers;

import backend.cargoTrack.dtos.RefreshTokenDto;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.cargoTrack.repositories.UserRepository;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import backend.cargoTrack.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import backend.cargoTrack.services.JwtService;
import backend.cargoTrack.services.AuthenticationService;
import backend.cargoTrack.dtos.RegisterDto;
import backend.cargoTrack.dtos.LoginDto;
import backend.cargoTrack.responses.LoginResponse;
@RequestMapping("/auth")
@RestController
public class LoginController {

  @Autowired
  UserRepository userRepo;
  @Autowired
  PasswordEncoder passwordEncoder;

  private final JwtService jwtService;

  private final AuthenticationService authenticationService;
    @Qualifier("userDetailsService")
    @Autowired
    private UserDetailsService userDetailsService;

  public LoginController(JwtService jwtService, AuthenticationService authenticationService) {
    this.jwtService = jwtService;
    this.authenticationService = authenticationService;
  }

  @PostMapping("/signup")
  public ResponseEntity<String> register(@RequestBody RegisterDto registerUserDto) {
    try {
      User registeredUser = authenticationService.signup(registerUserDto);
      return ResponseEntity.ok("Zarejestrowano pomyślnie");
    } catch (IllegalArgumentException e) {
      String errorMessage = e.getMessage();
      if (errorMessage.equals("Użytkownik o podanym e-mailu już istnieje")) {
        return ResponseEntity.status(400).body("Użytkownik o podanym e-mailu już istnieje");
      } else if (errorMessage.equals("Firma o podanej nazwie już istnieje")) {
        return ResponseEntity.status(400).body("Firma o podanej nazwie już istnieje");
      } else {
        return ResponseEntity.status(400).body(errorMessage);
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Wystąpił błąd podczas rejestracji");
    }
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto) {
    try {
      User authenticatedUser = authenticationService.authenticate(loginUserDto);

      String jwtToken = jwtService.generateToken(authenticatedUser);
      String refreshJwtToken = jwtService.generateRefreshToken(authenticatedUser);

      LoginResponse loginResponse = new LoginResponse();
      loginResponse.setToken(jwtToken);
      loginResponse.setExpiresIn(jwtService.getExpirationTime());
      loginResponse.setRefreshToken(refreshJwtToken);

      return ResponseEntity.ok(loginResponse);

    } catch (BadCredentialsException e) {
      LoginResponse response = new LoginResponse();
      response.setError(e.getMessage());
      return ResponseEntity.status(401).body(response);
    } catch (IllegalArgumentException e) {
      LoginResponse response = new LoginResponse();
      response.setError(e.getMessage());
      return ResponseEntity.status(400).body(response);
    } catch (Exception e) {
      LoginResponse response = new LoginResponse();
      response.setError("Wystąpił błąd podczas logowania");
      return ResponseEntity.status(500).body(response);
    }
  }
  @PostMapping("/refresh")
  public ResponseEntity<LoginResponse> refresh(@RequestBody RefreshTokenDto refreshTokenDto) {
    String refreshToken = refreshTokenDto.getRefreshToken();
    String username = jwtService.extractUsername(refreshToken);
    User user = userRepo.findByEmail(username);
    if (user == null) {
      return ResponseEntity.status(401).body(null);
    }
    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
    if(jwtService.isTokenValid(refreshToken, userDetails)){

        String newJwtToken = jwtService.generateRefreshToken(user);
        String newRefreshJwtToken = jwtService.generateRefreshToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(newJwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRefreshToken(newRefreshJwtToken);
      return ResponseEntity.ok(loginResponse);
      }


    else{
      return ResponseEntity.status(401).body(null);
    }
  }
}
