package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "status")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;
    @Column(nullable = false, unique = true)
    private String name;

    // Getters and setters
    // hashCode, equals, toString
}