package backend.cargoTrack.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "vehicle_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean trailerRequired;
}
