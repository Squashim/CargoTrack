package backend.cargoTrack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "building_type")
public class BuildingType {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;
    @Column(name="vehicle_capacity")
    private int vehicleCapacity;
    @Column(name="trailer_capacity")
    private int trailerCapacity;
    @Column(name="driver_capacity")
    private int driverCapacity;
    @Column(name="name")
    private String name;
    @Column(name="radius")
    private double radius;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVehicleCapacity() {
        return vehicleCapacity;
    }

    public void setVehicleCapacity(int vehicleCapacity) {
        this.vehicleCapacity = vehicleCapacity;
    }

    public int getTrailerCapacity() {
        return trailerCapacity;
    }

    public void setTrailerCapacity(int trailerCapacity) {
        this.trailerCapacity = trailerCapacity;
    }

    public int getDriverCapacity() {
        return driverCapacity;
    }

    public void setDriverCapacity(int driverCapacity) {
        this.driverCapacity = driverCapacity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }
}
