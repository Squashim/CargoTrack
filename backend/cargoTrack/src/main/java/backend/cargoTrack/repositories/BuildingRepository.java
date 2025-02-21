package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.Location;
import backend.cargoTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BuildingRepository  extends JpaRepository<Building, Integer> {
    Optional<List<Building>> findByUser(User user);
    int countByUser(User user);
    boolean existsByUserAndLocation(User user, Location location);
    @Query("SELECT b.location.id FROM Building b WHERE b.user = :user")
    List<Integer> findLocationsIdByUser(@Param("user") User user);
}

