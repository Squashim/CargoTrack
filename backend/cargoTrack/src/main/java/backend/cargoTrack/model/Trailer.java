package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "trailer")
public class Trailer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trailer")
    private Long idTrailer;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "capacity", nullable = false)
    private Double capacity;

    @Column(name = "register_number", nullable = false, unique = true, length = 10)
    private String registerNumber;

    @ManyToOne
    @JoinColumn(name = "user_id_user", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "trailer_type_id_trailer_type", nullable = false)
    private TrailerType trailerType;

    // Getters, setters, constructors
}
