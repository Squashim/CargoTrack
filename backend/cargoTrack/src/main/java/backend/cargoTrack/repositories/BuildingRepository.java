package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BuildingRepository  extends JpaRepository<Building, Integer> {
    Optional<List<Building>> findByUser(User user);
    int countByUser(User user);
}
