package backend.cargoTrack.services;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.Delivery;
import backend.cargoTrack.model.Driver;
import backend.cargoTrack.model.User;
import backend.cargoTrack.model.UserVehicle;
import backend.cargoTrack.repositories.*;
import backend.cargoTrack.responses.UserDetailsResponse;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final DriverRepository driverRepository;
    private final DeliveryRepository deliveryRepository;
    private final UserVehicleRepository vehicleRepository;
    private final JwtService jwtService;
    public UserService(
            UserRepository userRepository,
            BuildingRepository buildingRepository,
            UserVehicleRepository vehicleRepository,
            DriverRepository driverRepository,
            DeliveryRepository deliveryRepository,
            JwtService jwtService

    ) {
        this.userRepository = userRepository;
        this.buildingRepository = buildingRepository;
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
        this.deliveryRepository = deliveryRepository;
        this.jwtService = jwtService;
    }

    public UserDetailsResponse detailsResponse(String jwt) {

        User user = getUserByJwt(jwt);
        if (user == null) {
            return new UserDetailsResponse();
        }

        return new UserDetailsResponse(
                user.getEmail(),
                user.getCompanyName(),
                user.getBalance(),
                vehicleRepository.countByUser(user),
                buildingRepository.countByUser(user),
                driverRepository.countByUser(user),
                deliveryRepository.countByUserAndStatusName(user, "W TRAKCIE"),
                deliveryRepository.countByUserAndStatusName(user, "ZAKONCZONY")
        );
    }
    public User getUserByJwt(String jwt) {
        String username;
        try {
            username = jwtService.extractUsername(jwt);
            User user = userRepository.findByEmail(username);
            return userRepository.findById(user.getId()).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }
    public List<UserVehicle> getUserVehicles(String jwt) {
        User user = getUserByJwt(jwt);
         Optional <List<UserVehicle>> vehicles = vehicleRepository.findByUser(user);
        return vehicles.orElse(null);
    }
    public List<Building> getUserBuildings(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Building>> buildings = buildingRepository.findByUser(user);
        return buildings.orElse(null);
    }
    public List<Driver> getUserDrivers(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Driver>> drivers = driverRepository.findByUser(user);
        return drivers.orElse(null);
    }
    public List<Delivery> getUserDeliveries(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Delivery>> deliveries = deliveryRepository.findByUser(user);
        return deliveries.orElse(null);
    }

    public void saveUser(User user){
        userRepository.saveAndFlush(user);
    }
}
