package backend.cargoTrack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.cargoTrack.dtos.VehicleBuyDto;
import backend.cargoTrack.model.User;
import backend.cargoTrack.model.UserVehicle;
import backend.cargoTrack.model.Vehicle;
import backend.cargoTrack.repositories.VehicleRepository;
import backend.cargoTrack.services.UserService;
import backend.cargoTrack.services.VehicleService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    @Autowired
    private VehicleRepository vehicleRepository;
    private final VehicleService vehicleService;
    private final UserService userService;
    VehicleController(VehicleService vehicleService, UserService userService){
        this.vehicleService = vehicleService;
        this.userService = userService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        return ResponseEntity.ok().body(vehicles);
    }
    @GetMapping("/type/{vehicleTypeId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByType(@PathVariable Long vehicleTypeId) {
        List<Vehicle> vehicles = vehicleRepository.findByVehicleTypeId(vehicleTypeId);
        return ResponseEntity.ok().body(vehicles);
    }
    @PostMapping("/buy")
    public ResponseEntity<String> postMethodName(@RequestBody VehicleBuyDto vehicle,@CookieValue(name = "jwt") String jwt) {
        Vehicle vehicle2 = vehicleRepository.findById(vehicle.getVehicleId()).orElse(null);
        User user = userService.getUserByJwt(jwt);
        if(vehicle2 == null){
            return ResponseEntity.badRequest().body("Vehicle not found");
        }
        String response = vehicleService.buyVehicleForUser(user, vehicle2);
        return ResponseEntity.ok().body(response);
    }
@GetMapping("/user")
public ResponseEntity<List<UserVehicle>> getUserVehicles(@CookieValue(name = "jwt") String jwt){
    return ResponseEntity.ok().body(vehicleService.getAllUserVehicles(userService.getUserByJwt(jwt)));
}
}
