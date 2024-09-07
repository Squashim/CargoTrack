package backend.cargoTrack.dtos;

public class RegisterDto {

  private String email;
  private String password;
  private String companyName;

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setCompanyName(
      String companyName) {
    this.companyName = companyName;
  }

  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }

  public String getCompanyName() {
    return this.companyName;
  }

}
