package backend.cargoTrack.services;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.Delivery;
import backend.cargoTrack.model.Driver;
import backend.cargoTrack.model.User;
import backend.cargoTrack.model.Vehicle;
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
    private final VehicleRepository vehicleRepository;
    private final JwtService jwtService;
    public UserService(
            UserRepository userRepository,
            BuildingRepository buildingRepository,
            VehicleRepository vehicleRepository,
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
    public List<Vehicle> getUserVehicles(String jwt) {
        User user = getUserByJwt(jwt);
         Optional <List<Vehicle>> vehicles = vehicleRepository.findByUser(user);
            if(vehicles.isPresent()){
                return vehicles.get();
            }else{
                return null;
            }
    }
    public List<Building> getUserBuildings(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Building>> buildings = buildingRepository.findByUser(user);
        if(buildings.isPresent()){
            return buildings.get();
        }else{
            return null;
        }
    }
    public List<Driver> getUserDrivers(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Driver>> drivers = driverRepository.findByUser(user);
        if(drivers.isPresent()){
            return drivers.get();
        }else{
            return null;
        }
    }
    public List<Delivery> getUserDeliveries(String jwt) {
        User user = getUserByJwt(jwt);
        Optional <List<Delivery>> deliveries = deliveryRepository.findByUser(user);
        if(deliveries.isPresent()){
            return deliveries.get();
        }else{
            return null;
        }
    }
}
