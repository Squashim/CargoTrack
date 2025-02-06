package backend.cargoTrack.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "company_type")
public class CompanyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(nullable = false, unique = true) 
    private String type;

    
    public CompanyType() {}

    public CompanyType(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompanyType that = (CompanyType) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(type, that.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type);
    }

    @Override
    public String toString() {
        return "CompanyType{" +
                "id=" + id +
                ", type='" + type + '\'' +
                '}';
    }
}