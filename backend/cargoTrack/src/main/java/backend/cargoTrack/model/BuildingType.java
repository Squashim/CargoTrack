package backend.cargoTrack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "building_type")
public class BuildingType {
    @Id
    @Column(name = "id_building_type")
    private int id;
    @Column(name = "name")
    private String name;
}
