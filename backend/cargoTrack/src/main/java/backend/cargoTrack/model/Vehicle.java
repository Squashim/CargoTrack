package backend.cargoTrack.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vehicle")
    private Long idVehicle;

    @Column(name = "model", nullable = false, length = 25)
    private String model;

    @Column(name = "mark", nullable = false, length = 25)
    private String mark;

    @Column(name = "production_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date productionDate;

    @Column(name = "register_number", nullable = false, unique = true, length = 10)
    private String registerNumber;

    @Column(name = "power", nullable = false)
    private Double power;

    @ManyToOne
    @JoinColumn(name = "user_id_user", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "vehicle_type_id_vehicle_type", nullable = false)
    private VehicleType vehicleType;

    // Getters, setters, constructors
}
