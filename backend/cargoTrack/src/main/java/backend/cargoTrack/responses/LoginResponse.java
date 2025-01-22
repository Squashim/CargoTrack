
package backend.cargoTrack.responses;

public class LoginResponse {
  private String token;
  private long expiresIn;
  private String refreshToken;
  private String error;
  public String getToken() {
    return token;
  }

 public LoginResponse(){}
 public LoginResponse(String message){
    this.error = message;
  }
  public void setToken(String token) {
    this.token = token;
  }

  public long getExpiresIn() {
    return expiresIn;
  }

  public void setExpiresIn(long expiresIn) {
    this.expiresIn = expiresIn;
  }
  public void setRefreshToken(String refreshToken) {this.refreshToken = refreshToken;}
  public String getRefreshToken() {return refreshToken;}
  public String getError() {return error;}
  public void setError(String error) {this.error = error;}
}