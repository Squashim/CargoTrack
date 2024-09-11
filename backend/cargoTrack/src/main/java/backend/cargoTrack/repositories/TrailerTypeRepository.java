package backend.cargoTrack.repositories;

import backend.cargoTrack.model.TrailerType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailerTypeRepository extends JpaRepository<TrailerType, Integer> {
}
