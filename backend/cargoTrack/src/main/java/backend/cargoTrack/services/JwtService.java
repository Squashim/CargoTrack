package backend.cargoTrack.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.Instant;
import java.util.*;
import java.util.function.Function;
import backend.cargoTrack.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  @Value("${security.jwt.secret-key}")
  private String secretKey;

  @Value("${security.jwt.expiration-time}")
  private long jwtExpiration;
  @Value("${security.jwt.refresh-expiration-time}")
  private long refreshExpiration;
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String generateToken(User user) {
    return generateToken(new HashMap<>(), user);
  }

  public String generateToken(Map<String, Object> extraClaims, User user) {
    return buildToken(extraClaims, user, jwtExpiration);
  }
public String generateRefreshToken(User user) {
    return buildToken(new HashMap<>(), user,refreshExpiration);
}
  private String buildToken(Map<String, Object> extraClaims, User user, long expirationInSeconds) {
    long nowUtcMillis = System.currentTimeMillis(); // Pobranie aktualnego UTC w milisekundach
    Date issuedAt = new Date(nowUtcMillis);
    Date expirationDate = new Date(nowUtcMillis + expirationInSeconds * 1000); // Dodanie sekund

    return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(user.getEmail())
            .setIssuedAt(issuedAt)
            .setExpiration(expirationDate)
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);
    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }
  public Instant extractExpirationInstant(String token) {
    return extractClaim(token, Claims::getExpiration).toInstant();
  }

  public long getExpirationTime() {
    return this.jwtExpiration;
  }

  private boolean isTokenExpired(String token) {
    Date expiration = extractExpiration(token);

    Calendar utcNow = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
    return expiration.before(utcNow.getTime());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
  }

  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
