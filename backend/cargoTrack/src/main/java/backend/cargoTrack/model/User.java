package backend.cargoTrack.model;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "\"user\"")
public class User {
  @jakarta.persistence.Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_user")
  private long id;
  @Column(name = "email")
  public String email;
  @Column(name = "password")
  private String password;
  @Column(name = "company_name")
  private String companyName;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getCompanyName() {
    return companyName;
  }

  public void setCompanyName(String companyName) {
    this.companyName = companyName;
  }
}
