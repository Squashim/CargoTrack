package backend.cargoTrack.dtos;

public class LoginDto {

  private String email;
  private String password;
  private boolean isRememberChecked;
  public String getEmail() {
    return this.email;
  }

  public String getPassword() {
    return this.password;
  }
  public Boolean getIsRememberChecked() {return this.isRememberChecked;}
}
