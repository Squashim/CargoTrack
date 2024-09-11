package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_type")
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vehicle_type")
    private int idVehicleType;

    @Column(name = "name", nullable = false, length = 25)
    private String name;


}
