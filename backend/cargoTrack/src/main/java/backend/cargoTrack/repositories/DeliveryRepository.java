package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Delivery;
import backend.cargoTrack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<Delivery,Integer> {
    Optional<List<Delivery>> findByUser(User user);
    Optional<List<Delivery>> findByUserAndStatusName(User user, String status);
    int countByUserAndStatusName(User user, String status);
}
