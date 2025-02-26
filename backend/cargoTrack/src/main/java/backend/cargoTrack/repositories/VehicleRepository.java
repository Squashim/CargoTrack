package backend.cargoTrack.repositories;

import java.util.List;
import java.util.Optional;

import backend.cargoTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import backend.cargoTrack.model.Vehicle;
import backend.cargoTrack.model.VehicleType;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    Vehicle findByModel(String model);
    List<Vehicle> findByVehicleType(VehicleType vehicleType);
    List<Vehicle> findByVehicleTypeId(Long vehicleTypeId);
}
