package backend.cargoTrack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trailers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Trailer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "trailer_types_id", nullable = false)
    private TrailerType trailerType;
    
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;
    
    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;
}