package backend.cargoTrack.repositories;

import backend.cargoTrack.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    // Address findByCityAndStreetNameAndMaxHouseNumber(String cityA, String streetName, String maxHouseNumber);
}
