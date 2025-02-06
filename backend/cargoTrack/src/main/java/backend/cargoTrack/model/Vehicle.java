package backend.cargoTrack.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String model;
    private String brand;
    private Integer horsepower;
    private Integer maxSpeed;
    private Integer productionYear;
    private BigDecimal fuelConsumption;
    private BigDecimal price;
    private String color = "white";
    private String imagePath;
    private String registerNumber;
    
    @ManyToOne
    @JoinColumn(name = "users_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "vehicle_types_id", nullable = false)
    private VehicleType vehicleType;
    
    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
    
    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;
}