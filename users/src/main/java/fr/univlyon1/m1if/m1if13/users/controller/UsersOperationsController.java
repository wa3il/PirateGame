package fr.univlyon1.m1if.m1if13.users.controller;

import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.utils.JwtHelper;
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

    @Autowired
    public UsersOperationsController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost", "http://192.168.75.124", "https://192.168.75.124"})
    @Operation(summary = "User login", description = "Authenticate a user and generate JWT token")
    @ApiResponse(responseCode = "204", description = "Login successful")
    @ApiResponse(responseCode = "401", description = "Invalid credentials")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<Void> login(
            @RequestHeader("login") String login,
            @RequestHeader("password") String password,
            @RequestHeader("Origin") String origin) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                String jwtToken = JwtHelper.generateToken(login, origin);
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .header("Authorization", jwtToken)  // Add Authorization header
                        .header("Access-Control-Expose-Headers", "Authorization")  // Expose Authorization header
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
            @RequestHeader("login") String login) {
        // Just remove the token, no need to actually logout
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/authenticate")
    @Operation(summary = "Authenticate user", description = "Authenticate a user based on JWT token")
    @ApiResponse(responseCode = "204", description = "Authentication successful")
    @ApiResponse(responseCode = "401", description = "Invalid token")
    public ResponseEntity<Void> authenticate(
            @RequestParam("jwt") String jwt,
            @RequestHeader("Origin") String origin) {
        try {
            String subject = JwtHelper.verifyToken(jwt, origin);
            if (subject != null && !subject.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }
}
