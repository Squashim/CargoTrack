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
@Table(name = "goods")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Good {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal weight;
    private BigDecimal basePrice;
    
    @ManyToOne
    @JoinColumn(name = "good_subtype_id", nullable = false)
    private GoodSubtype goodSubtype;
}
