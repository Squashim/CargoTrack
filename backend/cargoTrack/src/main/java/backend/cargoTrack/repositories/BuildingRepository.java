package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BuildingRepository extends JpaRepository<Building, Long> {
}
