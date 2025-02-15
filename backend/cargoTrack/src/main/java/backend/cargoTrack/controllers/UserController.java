package backend.cargoTrack.controllers;

import backend.cargoTrack.repositories.UserRepository;
import backend.cargoTrack.responses.UserDetailsResponse;
import backend.cargoTrack.services.JwtService;
import backend.cargoTrack.services.UserService;
import backend.cargoTrack.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService, JwtService jwtService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/details")
    public ResponseEntity<UserDetailsResponse> getUserDetails(@CookieValue(name = "jwt", required = false) String jwt) {
        if (jwt == null || jwt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String username;
        try {
            username = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        User user = userRepository.findByEmail(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        System.out.println(user.getId());
        UserDetailsResponse userDetailsResponse = userService.detailsResponse(user.getId());
        return ResponseEntity.ok(userDetailsResponse);
    }
}

