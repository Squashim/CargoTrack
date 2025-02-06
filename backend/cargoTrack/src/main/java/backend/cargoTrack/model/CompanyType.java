package backend.cargoTrack.models;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "company_type")
public class CompanyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type;

    // Getters and setters
    // hashCode, equals, toString
}