package backend.cargoTrack.controllers;

import backend.cargoTrack.model.Building;
import backend.cargoTrack.model.BuildingType;
import backend.cargoTrack.model.Location;
import backend.cargoTrack.model.User;
import backend.cargoTrack.repositories.BuildingRepository;
import backend.cargoTrack.repositories.BuildingTypeRepository;
import backend.cargoTrack.repositories.LocationRepository;
import backend.cargoTrack.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backend.cargoTrack.services.BuildingService;
import backend.cargoTrack.dtos.BuyBuildingDto;
import java.util.List;

@RestController
@RequestMapping("/buildings")
public class BuildingController {
    private final UserService userService;
    private final BuildingService buildingService;
    private final BuildingTypeRepository buildingTypeRepository;
    private final LocationRepository locationRepository;

    public BuildingController(UserService userService, BuildingService buildingService, BuildingTypeRepository buildingTypeRepository, LocationRepository locationRepository, LocationRepository locationRepository1) {
        this.userService = userService;
        this.buildingService = buildingService;
        this.buildingTypeRepository = buildingTypeRepository;
        this.locationRepository = locationRepository1;
    }

    @GetMapping("/locations/{province}")
    public ResponseEntity<List<Location>> getBuildingByProvince(@PathVariable String province, @CookieValue(name = "jwt") String jwt) {
        User user = userService.getUserByJwt(jwt);
        List<Location> locations = buildingService.getAvailableLocations(province, user);
        return ResponseEntity.ok(locations);
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyBuilding(@RequestBody BuyBuildingDto buildingDto, @CookieValue(name = "jwt") String jwt) {
        System.out.println("wchodzi");
        String buildingName = buildingDto.getBuildingTypeName().trim();
        System.out.println(buildingName);
        BuildingType type = buildingTypeRepository.findByName(buildingName);
        System.out.println(type);
        System.out.println("Jest tu");
        User user = userService.getUserByJwt(jwt);
        Building building = new Building();
        Location location = locationRepository.getReferenceById(buildingDto.getLocationId());
        System.out.println(type.getName());
        double balance = user.getBalance() - buildingService.getCost(type);
        System.out.println(balance);
        if (buildingService.existsByUserAndLocation(user, location)) {
            return ResponseEntity.badRequest().body("Użytkownik ma już zakupiony budynek w tej lokalizacji.");
        }

        if (balance < 0) {
            return ResponseEntity.badRequest().body("Użytkownik ma za mało siana");
        } else {
            building.setBuildingType(type);
            building.setUser(user);
            building.setLocation(location);
            building.setName(buildingDto.getBuildingName());
            user.setBalance(balance);
            System.out.println("User balance" + user.getBalance());
            userService.saveUser(user);
            buildingService.saveBuilding(building);
            return ResponseEntity.ok("Zakup przebiegł pomyślnie");
        }
    }

    @GetMapping("/userBuildings")
    public ResponseEntity<List<Building>> getUserBuildings(@CookieValue(name = "jwt") String jwt) {
        User user = userService.getUserByJwt(jwt);
        List<Building> userBuilding = buildingService.getUserBuildings(user);
        return ResponseEntity.ok(userBuilding);
    }

    @GetMapping("/allTypes")
    public ResponseEntity<List<BuildingType>> getAllTypes() {
        List<BuildingType> types = buildingTypeRepository.findAll();
        System.out.println("Pobrane typy budynków: " + types.size());
        return ResponseEntity.ok(types);
    }
}

