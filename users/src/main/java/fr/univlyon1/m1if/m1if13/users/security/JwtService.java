package fr.univlyon1.m1if.m1if13.users.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY ="YR0FTAPRZL3H2D5MLR7HV46MI8QC4QL0CJ0F1G69GPOJHD6XQLEMZ5YFRIWO7YQV3IECJDS63VVWI123VZG7VFR60MMSWUA3JLMI853TWSAWUCSMVZUGAXJ6CTOUQR1RZZV2LU3IDY9CV4QK3DZH5ZO2SDWUXKQFS7366M1TA8H90PW6W74C27M3PTW9EJAXAB8W3HM3EHOC8QGTD3VRXZD6ROGHD7C48MIGZOILMIQ13O5325S3WR12VJKH7WQ5";
    public String extractUserLogin(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwt);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails, String origin) {
        return generateToken(new HashMap<>(), userDetails, origin);
    }

    public String generateToken(Map<String, Object> ExtraClaims, UserDetails userDetails, String origin) {
        return Jwts.builder()
                .setClaims(ExtraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuer(origin)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 1 day
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        try{
            final String userlogin = extractUserLogin(jwt);
            return (userlogin.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
        }
        catch (Exception e){
            return false;
        }
    }

    private boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    private Date extractExpiration(String jwt) {
        return extractClaim(jwt, Claims::getExpiration);
    }

    private Key getSigningKey() {
        byte[] KeyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(KeyBytes);
    }

    public String extractUserOrigin(String token) {
        return extractClaim(token, Claims::getIssuer);
    }
}
