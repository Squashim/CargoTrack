package backend.cargoTrack.repositories;

import backend.cargoTrack.model.CompanyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface CompanyTypeRepository extends JpaRepository<CompanyType, Integer> {
}