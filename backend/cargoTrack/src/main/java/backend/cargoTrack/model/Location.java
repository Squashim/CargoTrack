package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(nullable = false)
    private double longitude;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private String postalCode;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String province;

    @Column(nullable = false)
    private String street;

    // Getters and setters
    // hashCode, equals, toString
}