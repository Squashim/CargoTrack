package backend.cargoTrack.services;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.BuildingType;
import backend.cargoTrack.model.Location;
import backend.cargoTrack.model.User;
import backend.cargoTrack.repositories.BuildingRepository;
import backend.cargoTrack.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;
    private final LocationRepository locationRepository;
    public  BuildingService(BuildingRepository buildingRepository, LocationRepository locationRepository) {
        this.buildingRepository = buildingRepository;
        this.locationRepository = locationRepository;
    }

    public List<Location> getAvailableLocations(String province,User user){
        List<Integer> ownedLocationIds = buildingRepository.findLocationsIdByUser(user);
        if(ownedLocationIds.isEmpty()){
            return locationRepository.findByProvince(province);
        }
        return locationRepository.findByProvinceAndIdNotIn(province,ownedLocationIds);
    }
    public double getCost(BuildingType buildingType){
        return switch (buildingType.getName()) {
            case "Siedziba" -> 50000;
            case "Oddział" -> 150000;
            case "Mały Garaż" -> 30000;
            case "Średni Garaż" -> 80000;
            case "Duży Garaż" -> 110000;
            default -> 0;
        };
    }
    public void saveBuilding(Building building){
        buildingRepository.save(building);
    }
    public boolean existsByUserAndLocation(User user, Location location){
        return buildingRepository.existsByUserAndLocation(user, location);
    }

    public List<Building> getUserBuildings(User user) {
        Optional<List<Building>> buildings = buildingRepository.findByUser(user);
        return buildings.orElseGet(ArrayList::new);
    }
}
