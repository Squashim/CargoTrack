package backend.cargoTrack.model;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_addres")
    private  int Id;
    @Column(name = "street_name")
    String streetName;
    @Column(name = "house_number")
    String maxHouseNumber;
    @Column(name ="postal_code")
    String postalCode;
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getMaxHouseNumber() {
        return maxHouseNumber;
    }

    public void setMaxHouseNumber(String maxHouseNumber) {
        this.maxHouseNumber = maxHouseNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

}
