package backend.cargoTrack.repositories;

import backend.cargoTrack.model.BuildingType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BuildingTypeRepository extends JpaRepository<BuildingType, Integer> {
    BuildingType findByName(String name);
    @Query("SELECT  b from BuildingType  b")
    List<BuildingType> findAllBuildingTypes();
}
