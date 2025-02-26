package backend.cargoTrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.cargoTrack.model.User;
import backend.cargoTrack.model.UserVehicle;
import java.util.List;
import java.util.Optional;


public interface UserVehicleRepository extends JpaRepository<UserVehicle,Integer>  {
    int countByUser(User user);
    Optional<List<UserVehicle>> findByUser(User user);
}
