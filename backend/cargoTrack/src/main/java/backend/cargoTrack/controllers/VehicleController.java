package backend.cargoTrack.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.cargoTrack.model.Vehicle;
import backend.cargoTrack.repositories.VehicleRepository;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    @Autowired
    private VehicleRepository vehicleRepository;
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
}
