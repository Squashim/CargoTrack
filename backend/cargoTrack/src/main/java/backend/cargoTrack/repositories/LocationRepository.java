package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Integer> {
 List<Location> findByCity(String city);
 List<Location> findByProvince(String province);
 List<Location> findByProvinceAndIdNotIn(String province, List<Integer> excludedIds);
}