package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Trailer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailerRepository extends JpaRepository<Trailer, Long> {
}
