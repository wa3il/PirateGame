package fr.univlyon1.m1if.m1if13.users.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.Date;
import java.util.Optional;

@Controller
public class UsersOperationsController {

    private final UserDao userDao;

    private final String secretKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphY2sgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lzqnhucjESt_hUIOcGsau-Q7XAZ5HJvWQWwjie59x1s";

    @Autowired
    public UsersOperationsController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate a user and generate JWT token")
    @ApiResponse(responseCode = "204", description = "Login successful")
    @ApiResponse(responseCode = "401", description = "Invalid credentials")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<Void> login(
            @Parameter(description = "User login", required = true) @RequestParam("login") String login,
            @Parameter(description = "User password", required = true) @RequestParam("password") String password) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                String jwtToken = generateToken(login);
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .header("Authentication", jwtToken)
                        .build();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "User logout", description = "Logout a user and invalidate JWT token")
    @ApiResponse(responseCode = "204", description = "Logout successful")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<Void> logout(
            @Parameter(description = "User login", required = true) @RequestParam("login") String login) {
        // Pas besoin de déconnexion, on supprime juste le token
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/authenticate")
    @Operation(summary = "Authenticate user", description = "Authenticate a user based on JWT token")
    @ApiResponse(responseCode = "204", description = "Authentication successful")
    @ApiResponse(responseCode = "401", description = "Invalid token")
    public ResponseEntity<Void> authenticate(
            @Parameter(description = "JWT token", required = true) @RequestParam("jwt") String jwt) {
        if (validateToken(jwt)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }

    /**
     * Génère un token JWT pour l'utilisateur donné
     * @param login Le login de l'utilisateur
     * @return Le token JWT généré
     */
    private String generateToken(String login) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 3600000); // Expire dans 1 heure

        return JWT.create()
                .withSubject(login)
                .withExpiresAt(expiryDate)
                .sign(Algorithm.HMAC256(secretKey));
    }

    /**
     * Valide un token JWT
     * @param jwt Le token JWT à valider
     * @return true si le token est valide, false sinon
     */
    private boolean validateToken(String jwt) {
        try {
            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(secretKey)).build().verify(jwt);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }
}
