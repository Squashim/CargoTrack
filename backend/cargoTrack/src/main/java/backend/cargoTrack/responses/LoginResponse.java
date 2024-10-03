
package backend.cargoTrack.responses;

public class LoginResponse {
  private String token;
  private long expiresIn;
  private String refreshToken;
  public String getToken() {
    return token;
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
}
