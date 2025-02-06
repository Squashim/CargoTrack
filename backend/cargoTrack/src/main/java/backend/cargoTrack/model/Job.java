package backend.cargoTrack.model;

import java.math.BigDecimal;

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
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal distance;
    private BigDecimal payment;
    
    @ManyToOne
    @JoinColumn(name = "destination_company", nullable = false)
    private Company destinationCompany;
    
    @ManyToOne
    @JoinColumn(name = "origin_company", nullable = false)
    private Company originCompany;
    
    @ManyToOne
    @JoinColumn(name = "goods_id", nullable = false)
    private Good good;
}