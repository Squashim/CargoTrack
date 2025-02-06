package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface StatusRepository extends JpaRepository<Status, Integer> {
}