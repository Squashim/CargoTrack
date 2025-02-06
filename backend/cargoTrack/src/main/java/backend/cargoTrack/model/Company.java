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
@Table(name = "company")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private String street;
    private String number;
    private String postalCode;
    private String city;
    private String province;
    
    @ManyToOne
    @JoinColumn(name = "company_types_id", nullable = false)
    private CompanyType companyType;
}