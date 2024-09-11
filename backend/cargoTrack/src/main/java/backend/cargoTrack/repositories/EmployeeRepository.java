package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
