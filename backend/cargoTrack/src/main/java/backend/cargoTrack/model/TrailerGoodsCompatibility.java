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
@Table(name = "trailer_goods_compatibility")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrailerGoodsCompatibility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "jobs_id", nullable = false)
    private Job job;
    
    @ManyToOne
    @JoinColumn(name = "good_types_id", nullable = false)
    private GoodType goodType;
    
    @ManyToOne
    @JoinColumn(name = "trailer_types_id", nullable = false)
    private TrailerType trailerType;
}
