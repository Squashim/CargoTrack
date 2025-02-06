package backend.cargoTrack.model;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

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
@Table(name = "deliveries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
    private BigDecimal fuelUsed;
    
    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "jobs_id", nullable = false)
    private Job job;
    
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;
}