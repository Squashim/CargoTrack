package backend.cargoTrack.model;

import jakarta.persistence.*;
@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_city")
    private int idCity;
    @Column(name = "name")
    private String name;
    @Column(name = "population")
    private int population;
    @Column(name = "coordinates")
    private String coordinates;

}
