package backend.cargoTrack.dtos;

import lombok.Data;

@Data
public class BuyBuildingDto {
    private int locationId;
    private String buildingTypeName;
    private String buildingName;
}
