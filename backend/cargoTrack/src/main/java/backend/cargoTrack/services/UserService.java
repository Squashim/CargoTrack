package backend.cargoTrack.services;

import backend.cargoTrack.model.User;
import backend.cargoTrack.repositories.*;
import backend.cargoTrack.responses.UserDetailsResponse;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BuildingRepository buildingRepository;
    private final DriverRepository driverRepository;
    private final DeliveryRepository deliveryRepository;
    private final VehicleRepository vehicleRepository;

    public UserService(
            UserRepository userRepository,
            BuildingRepository buildingRepository,
            VehicleRepository vehicleRepository,
            DriverRepository driverRepository,
            DeliveryRepository deliveryRepository
    ) {
        this.userRepository = userRepository;
        this.buildingRepository = buildingRepository;
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
        this.deliveryRepository = deliveryRepository;
    }

    public UserDetailsResponse detailsResponse(int userId) {
        User user = userRepository.findById(userId).orElse(null);
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
}
