package backend.cargoTrack.controllers;

import backend.cargoTrack.dtos.RefreshTokenDto;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Qualifier;
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
  public ResponseEntity<User> register(@RequestBody RegisterDto registerUserDto) {
    System.out.println("register");
    User registeredUser = authenticationService.signup(registerUserDto);

    return ResponseEntity.ok(registeredUser);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDto loginUserDto) {
    User authenticatedUser = authenticationService.authenticate(loginUserDto);
    String jwtToken = jwtService.generateToken(authenticatedUser);
    String refreshJwtToken = jwtService.generateRefreshToken(authenticatedUser);
    LoginResponse loginResponse = new LoginResponse();
    loginResponse.setToken(jwtToken);
    loginResponse.setExpiresIn(jwtService.getExpirationTime());
    loginResponse.setRefreshToken(refreshJwtToken);
    System.out.println(loginResponse);
    System.out.println(loginResponse.getRefreshToken());
    return ResponseEntity.ok(loginResponse);
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
