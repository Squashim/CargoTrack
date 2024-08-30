package backend.cargoTrack.controllers;

import org.springframework.web.bind.annotation.RestController;

import backend.cargoTrack.repositories.UserRepositories;

import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import backend.cargoTrack.model.User;
import backend.cargoTrack.model.LoginModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class UserController {

  @Autowired
  UserRepositories userRepo;
  @Autowired
  PasswordEncoder passwordEncoder;

  @PostMapping("/registerUser")
  public ResponseEntity<String> registerUser(@RequestBody User user) {

    if (userRepo.findByEmail(user.getEmail()) != null) {
      return ResponseEntity.status(HttpStatus.CONFLICT)
          .body("Rejestracja nieudana: Użytkownik z takim adresem email już istnieje.");
    }
    if (!userRepo.findByCompanyName(user.getCompanyName()).isEmpty()) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Rejestracja nieudana: Firma o tej nazwie już istnieje.");
    }
    String hashedPassword = passwordEncoder.encode(user.getPassword());
    user.setPassword(hashedPassword);
    userRepo.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body("Rejestracja zakończona pomyślnie.");
  }

  @PostMapping("/loginUser")
  public ResponseEntity<String> loginUser(@RequestBody LoginModel loginModel) {
    User loggingUser = userRepo.findByEmail(loginModel.getEmail());
    if (loggingUser == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nie ma użytkownika o podanym emailu.");
    }
    if (passwordEncoder.matches(loginModel.getPassword(), loggingUser.getPassword())) {
      return ResponseEntity.ok("Zalogowano pomyślnie.");
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędne hasło.");
    }
  }
}
