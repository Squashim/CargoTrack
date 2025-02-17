package backend.cargoTrack.controllers;

import backend.cargoTrack.responses.UserDetailsResponse;

import backend.cargoTrack.services.UserService;
import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.Delivery;
import backend.cargoTrack.model.Driver;
import backend.cargoTrack.model.Vehicle;

import java.util.List;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/user")
public class UserController {
  
    private final UserService userService;


    
    public UserController(UserService userService) {
     
        this.userService = userService;
    
    }

    @GetMapping("/details")
    public ResponseEntity<UserDetailsResponse> getUserDetails(@CookieValue(name = "jwt") String jwt) {
       
        UserDetailsResponse userDetailsResponse = userService.detailsResponse(jwt);
        return ResponseEntity.ok(userDetailsResponse);
    }
    @GetMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getVehicles(@CookieValue(name = "jwt") String jwt) {
      List<Vehicle> vehicles = userService.getUserVehicles(jwt);
        return ResponseEntity.ok(vehicles);
    }
    @GetMapping("/buildings")
    public ResponseEntity<List<Building>> getBuildings(@CookieValue(name = "jwt") String jwt) {
        List<Building> buildings = userService.getUserBuildings(jwt);
        return ResponseEntity.ok(buildings);
    }
    @GetMapping("/drivers")
    public ResponseEntity<List<Driver>> getDrivers(@CookieValue(name = "jwt") String jwt) {
        List<Driver> drivers = userService.getUserDrivers(jwt);
        return ResponseEntity.ok(drivers);
    }
    @GetMapping("/deliveries")
   public ResponseEntity<List<Delivery>> getDeliveries(@CookieValue(name = "jwt") String jwt){
        List<Delivery> deliveries = userService.getUserDeliveries(jwt);
        return ResponseEntity.ok(deliveries);
    }
    
    
}

