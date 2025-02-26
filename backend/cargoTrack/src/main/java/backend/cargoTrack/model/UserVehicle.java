package backend.cargoTrack.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@Table(name = "user_vehicles")
@AllArgsConstructor
@NoArgsConstructor
public class UserVehicle {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne
  @JoinColumn(name = "users_id")
  private User user;
  @ManyToOne
  @JoinColumn(name = "vehicle_id")
  private Vehicle vehicle;

  @ManyToOne
  @JoinColumn(name = "status_id")
  private Status status;

  @Column(name = "register_number", unique = true)
  private String registerNumber;

  @ManyToOne
  @JoinColumn(name = "building_id")
  private Building building;

  @ManyToOne
  @JoinColumn(name = "trailer_id")
  private Trailer trailer;

}
