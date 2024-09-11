package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "trailer_type")
public class TrailerType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trailer_type")
    private int idTrailerType;

    @Column(name = "type_name", nullable = false, length = 45)
    private String typeName;

    // Getters, setters, constructors
}
