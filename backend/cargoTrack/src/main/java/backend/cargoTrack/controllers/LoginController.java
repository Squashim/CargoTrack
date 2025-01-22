package backend.cargoTrack.controllers;

import backend.cargoTrack.dtos.RefreshTokenDto;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import backend.cargoTrack.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
  private UserRepository userRepo;
  @Autowired
  private PasswordEncoder passwordEncoder;
  @Value("${security.jwt.expiration-time}")
  private long jwtExpiration;
  @Value("${security.jwt.refresh-expiration-time}")
  private long refreshExpiration;
  private final JwtService jwtService;
  private final AuthenticationService authenticationService;

  @Autowired
  @Qualifier("userDetailsService")
  private UserDetailsService userDetailsService;

  public LoginController(JwtService jwtService, AuthenticationService authenticationService) {
    this.jwtService = jwtService;
    this.authenticationService = authenticationService;
  }

  private void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
    Cookie cookie = new Cookie(name, value);
    cookie.setMaxAge(maxAge);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    response.addCookie(cookie);
  }

  @PostMapping("/signup")
  public ResponseEntity<String> register(@RequestBody RegisterDto registerUserDto) {
    try {
      authenticationService.signup(registerUserDto);
      return ResponseEntity.ok("Zarejestrowano pomyślnie");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.status(400).body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Wystąpił błąd podczas rejestracji");
    }
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto, HttpServletResponse response) {
    try {
      User authenticatedUser = authenticationService.authenticate(loginUserDto);

      String jwtToken = jwtService.generateToken(authenticatedUser);
      String refreshJwtToken = jwtService.generateRefreshToken(authenticatedUser);
      int jwtMaxAge = loginUserDto.getIsRememberChecked() ? (int) jwtExpiration * 360 : (int) jwtExpiration;
      int refreshMaxAge = loginUserDto.getIsRememberChecked() ? (int) refreshExpiration * 360 : (int) refreshExpiration;
      System.out.println(jwtMaxAge);
      addCookie(response, "jwt", jwtToken, jwtMaxAge);
      addCookie(response, "refresh", refreshJwtToken, refreshMaxAge);

      LoginResponse loginResponse = new LoginResponse();
      loginResponse.setToken(jwtToken);
      loginResponse.setExpiresIn(jwtMaxAge);
      loginResponse.setRefreshToken(refreshJwtToken);

      return ResponseEntity.ok(loginResponse);

    } catch (BadCredentialsException | IllegalArgumentException e) {
      return ResponseEntity.status(e instanceof BadCredentialsException ? 401 : 400)
              .body(new LoginResponse(e.getMessage()));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new LoginResponse("Wystąpił błąd podczas logowania"));
    }
  }

  @PostMapping("/refresh")
  public ResponseEntity<LoginResponse> refresh(@CookieValue(value = "refresh") String refreshToken, HttpServletResponse response) {
    try {
      String username = jwtService.extractUsername(refreshToken);
      User user = userRepo.findByEmail(username);
      if (user == null || !jwtService.isTokenValid(refreshToken, userDetailsService.loadUserByUsername(username))) {
        return ResponseEntity.status(401).body(null);
      }

      String newJwtToken = jwtService.generateToken(user);
      String newRefreshJwtToken = jwtService.generateRefreshToken(user);

      addCookie(response, "jwt", newJwtToken, (int) jwtExpiration);
      addCookie(response, "refresh", newRefreshJwtToken, (int) refreshExpiration);

      LoginResponse loginResponse = new LoginResponse();
      loginResponse.setToken(newJwtToken);
      loginResponse.setExpiresIn(jwtService.getExpirationTime());
      loginResponse.setRefreshToken(newRefreshJwtToken);

      return ResponseEntity.ok(loginResponse);

    } catch (ExpiredJwtException e) {
      //return ResponseEntity.ok();
      return ResponseEntity.ok(new LoginResponse(""));
    }
  }

  @PostMapping("/verify")
  public ResponseEntity<String> verifyToken(@CookieValue(value = "jwt", required = false) String accessToken) {
    if (accessToken == null) return ResponseEntity.ok("");
    try {
      String username = jwtService.extractUsername(accessToken);
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      if (jwtService.isTokenValid(accessToken, userDetails)) {
        return ResponseEntity.ok("Token is valid");
      }
      return ResponseEntity.status(403).body("Invalid access token");
    } catch (ExpiredJwtException e) {
      return ResponseEntity.status(401).body("Access token expired");
    } catch (Exception e) {
      return ResponseEntity.status(403).body("Invalid access token");
    }
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(HttpServletResponse response) {
    addCookie(response, "jwt", null, 0);
    addCookie(response, "refresh", null, 0);
    return ResponseEntity.ok("Wylogowano");
  }
}