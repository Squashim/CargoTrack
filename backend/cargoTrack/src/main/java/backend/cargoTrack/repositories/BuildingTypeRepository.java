package backend.cargoTrack.repositories;

import backend.cargoTrack.model.BuildingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BuildingTypeRepository extends JpaRepository<BuildingType, Integer> {
}
