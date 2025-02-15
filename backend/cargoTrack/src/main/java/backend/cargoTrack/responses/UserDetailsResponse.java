package backend.cargoTrack.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsResponse {
    private String email;
    private String companyName;
    private double accountBalance;
    private int numberOfVehicles;
    private int numberOfBuildings;
    private int numberOfDrivers;
    private int numberOfDeliveriesInProgress;
    private int numberOfEndedDeliveries;


}

