package backend.cargoTrack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import backend.cargoTrack.model.User;
import java.util.List;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByCompanyName(String companyName);

  User findByEmail(String email);
}
