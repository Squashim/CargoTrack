package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "building")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_building")
    private Long idBuilding;

    @Column(name = "price", nullable = false, length = 45)
    private String price;

    @Column(name = "available_truck_slots", nullable = false, length = 45)
    private String availableTruckSlots;

    @Column(name = "max_truck_slots", nullable = false, length = 45)
    private String maxTruckSlots;

    @Column(name = "employee_slots", nullable = false, length = 45)
    private String employeeSlots;

    @Column(name = "available_employee_slots", nullable = false, length = 45)
    private String availableEmployeeSlots;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "user_id_user", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "building_type_id_building_type", nullable = false)
    private BuildingType buildingType;

    @Column(name = "building_stage", nullable = false)
    private Integer buildingStage;

}

