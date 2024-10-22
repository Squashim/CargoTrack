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
  UserRepository userRepo;
  @Autowired
  PasswordEncoder passwordEncoder;
  @Value("${security.jwt.expiration-time}")
  private long jwtExpiration;
  @Value("${security.jwt.refresh-expiration-time}")
  private long refreshExpiration;
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
      System.out.println("");
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
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto, HttpServletResponse response) {
    try {
      User authenticatedUser = authenticationService.authenticate(loginUserDto);

      String jwtToken = jwtService.generateToken(authenticatedUser);
      String refreshJwtToken = jwtService.generateRefreshToken(authenticatedUser);

      LoginResponse loginResponse = new LoginResponse();
      loginResponse.setToken(jwtToken);
      loginResponse.setExpiresIn(jwtService.getExpirationTime());
      loginResponse.setRefreshToken(refreshJwtToken);
      Cookie cookie = new Cookie("jwt",jwtToken);
      cookie.setMaxAge((int)jwtExpiration);
      cookie.setPath("/");
      cookie.setHttpOnly(true);
      cookie.setSecure(true);
      response.addCookie(cookie);
      Cookie cookie1 = new Cookie("refresh", refreshJwtToken);
      cookie1.setMaxAge((int)refreshExpiration);
      cookie1.setPath("/");
      cookie1.setHttpOnly(true);
      cookie1.setSecure(true);
      response.addCookie(cookie1);

      return ResponseEntity.ok(loginResponse);

    }
    catch (BadCredentialsException e) {
      LoginResponse lresponse = new LoginResponse();
      lresponse.setError(e.getMessage());
      return ResponseEntity.status(401).body(lresponse);
    } catch (IllegalArgumentException e) {
      LoginResponse lresponse = new LoginResponse();
      lresponse.setError(e.getMessage());
      return ResponseEntity.status(400).body(lresponse);
    } catch (Exception e) {
      LoginResponse lresponse = new LoginResponse();
      lresponse.setError("Wystąpił błąd podczas logowania");
      return ResponseEntity.status(500).body(lresponse);
    }
  }
  @PostMapping("/refresh")
  public ResponseEntity<LoginResponse> refresh(@CookieValue(value = "refresh", required = true)String refreshToken, HttpServletResponse response) {
    try {
      String username = jwtService.extractUsername(refreshToken);
      User user = userRepo.findByEmail(username);
      if (user == null) {
        return ResponseEntity.status(401).body(null);
      }
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);
      if (jwtService.isTokenValid(refreshToken, userDetails)) {

        String newJwtToken = jwtService.generateRefreshToken(user);
        String newRefreshJwtToken = jwtService.generateRefreshToken(user);
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(newJwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setRefreshToken(newRefreshJwtToken);
        Cookie cookie = new Cookie("jwt", newJwtToken);
        cookie.setMaxAge((int) jwtExpiration);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        response.addCookie(cookie);
        Cookie cookie1 = new Cookie("refresh", newRefreshJwtToken);
        cookie.setMaxAge((int) refreshExpiration);
        cookie1.setPath("/");
        cookie1.setHttpOnly(true);
        cookie1.setSecure(true);
        response.addCookie(cookie1);
        return ResponseEntity.ok(loginResponse);
      } else {
        return ResponseEntity.status(401).body(null);
      }
    } catch (ExpiredJwtException e){
      LoginResponse lResponse = new LoginResponse();
      lResponse.toString();
      return ResponseEntity.ok(lResponse);
    }
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verifyToken(@CookieValue(value = "jwt", required = false) String accessToken) {
    if (accessToken == null) {
      return ResponseEntity.ok("");
    }
    try {
      // Verify the access token
      String username = jwtService.extractUsername(accessToken);
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      if (jwtService.isTokenValid(accessToken, userDetails)) {
        return ResponseEntity.ok().body("Token is valid");
      } else {
        return ResponseEntity.status(403).body("Invalid access token");
      }
    } catch (ExpiredJwtException e) {
      return ResponseEntity.status(401).body("Access token expired");
    } catch (Exception e) {
      return ResponseEntity.status(403).body("Invalid access token");

    }
  }
@PostMapping("/logout")
  public ResponseEntity<?> logout(HttpServletResponse response) {
    Cookie cookie = new Cookie("jwt", null);
    cookie.setMaxAge(0);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    response.addCookie(cookie);
    Cookie cookie1 = new Cookie("refresh", null);
    cookie1.setMaxAge(0);
    cookie1.setPath("/");
    cookie1.setHttpOnly(true);
    cookie1.setSecure(true);
    response.addCookie(cookie1);
    return ResponseEntity.ok("Wylogowano");
  }
}