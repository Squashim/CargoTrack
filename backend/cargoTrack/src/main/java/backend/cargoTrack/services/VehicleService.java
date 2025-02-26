package backend.cargoTrack.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import backend.cargoTrack.model.User;
import backend.cargoTrack.repositories.StatusRepository;
import backend.cargoTrack.repositories.UserVehicleRepository;
import backend.cargoTrack.repositories.VehicleRepository;
import backend.cargoTrack.model.UserVehicle;
import backend.cargoTrack.model.Vehicle;
@Service
public class VehicleService {
private final VehicleRepository vehicleRepository;
private final UserVehicleRepository userVehicleRepository;
private final StatusRepository statusRepository;
VehicleService(VehicleRepository vehicleRepository, UserVehicleRepository userVehicleRepository,StatusRepository statusRepository){
  this.vehicleRepository = vehicleRepository;
  this.userVehicleRepository = userVehicleRepository;
  this.statusRepository = statusRepository;
}
public List<UserVehicle> getAllUserVehicles(User user){
  return userVehicleRepository.findByUser(user).orElse(null);
}
public void saveUserVehicle(UserVehicle userVehicle){
  userVehicleRepository.save(userVehicle);
}
public String buyVehicleForUser(User user, Vehicle vehicle){
  if(BigDecimal.valueOf(user.getBalance()).subtract(vehicle.getPrice()).compareTo(BigDecimal.ZERO) < 0){
    return "Za mało pieniedzy";
  }
  user.setBalance(BigDecimal.valueOf(user.getBalance()).subtract(vehicle.getPrice()).doubleValue());
  String registrationNumber = generateRegistrationNumber();

    UserVehicle userVehicle = new UserVehicle();
    userVehicle.setUser(user);
    userVehicle.setVehicle(vehicle);
    userVehicle.setRegisterNumber(registrationNumber);
    userVehicle.setStatus(statusRepository.findById(1).orElse(null));
    userVehicleRepository.save(userVehicle);
    return "Zakup sie powiodl";
  }
  private String generateRegistrationNumber() {
    String alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    StringBuilder registrationNumber = new StringBuilder();
    for (int i = 0; i < 7; i++) {
      int index = (int) (alphanumeric.length() * Math.random());
      registrationNumber.append(alphanumeric.charAt(index));
    }
    return registrationNumber.toString();
  }
}
