package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Driver;
import backend.cargoTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DriverRepository extends JpaRepository<Driver,Integer> {
    Optional<List<Driver>> findByUser(User user);
    int countByUser(User user);
}
