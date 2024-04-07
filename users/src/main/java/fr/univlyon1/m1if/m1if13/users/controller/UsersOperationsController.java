package fr.univlyon1.m1if.m1if13.users.controller;

import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.dto.UserLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import javax.naming.AuthenticationException;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import static fr.univlyon1.m1if.m1if13.users.utils.JwtHelper.*;

@Controller
public class UsersOperationsController {

    private final UserDao userDao;

    @Autowired
    public UsersOperationsController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/login")
    @CrossOrigin(origins = {"http://localhost:8080", "http://192.168.75.124:8080", "https://192.168.75.124", "https://192.168.75.124/api", "https://192.168.75.124/api/users" })
    @Operation(summary = "User login", description = "Authenticate a user and generate JWT token")
    @ApiResponse(responseCode = "204", description = "Login successful")
    @ApiResponse(responseCode = "401", description = "Invalid credentials")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<Void> login(
            @RequestBody final UserLoginDto userDto,
            @RequestHeader("origin") String origin) throws Exception {
        if (userDto.getLogin() == null || userDto.getPassword() == null ) {
            throw new Exception("Paramètre manquant");
        }
        Optional<User> user = userDao.get(userDto.getLogin());
        if (user.isPresent()) {
            user.get().authenticate(userDto.getPassword());
            if (user.get().isConnected()) {
                String token = generateToken(userDto.getLogin(), origin);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Authentication", "Bearer " + token);
                headers.add("Access-Control-Expose-Headers", "Authentication");
                return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new NoSuchElementException("Cet utilisateur n'existe pas");
        }
    }

    @PostMapping("/logout")
    @Operation(summary = "User logout", description = "Logout a user and invalidate JWT token")
    @ApiResponse(responseCode = "204", description = "Logout successful")
    @ApiResponse(responseCode = "404", description = "User not found")
    public ResponseEntity<Void> logout(@RequestHeader("Authentication") final String jwt,
                                       @RequestHeader("origin") final String origin) throws Exception {
        String token = jwt.replace("Bearer ", "");
        String login = verifyToken(token, origin);
        Optional<User> user = userDao.get(login);
        if (user.isPresent()) {
            if (user.get().isConnected()) {
                user.get().disconnect();
                String newToken = noLifeTimeToken(login, origin);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Authentication", "Bearer " + newToken);
                return new ResponseEntity<>(headers, HttpStatus.NO_CONTENT);
            } else {
                throw new Exception("Déconnexion impossible");
            }
        } else {
            throw new AuthenticationException("Erreur d'authorisation");
        }
    }

    @GetMapping("/authenticate")
    @Operation(summary = "Authenticate user", description = "Authenticate a user based on JWT token")
    @ApiResponse(responseCode = "204", description = "Authentication successful")
    @ApiResponse(responseCode = "401", description = "Invalid token")
    public ResponseEntity<String> authenticate(
            @RequestParam("jwt") final String jwt,
            @RequestParam("origin") final String origin) throws Exception {
        String token = jwt.replace("Bearer ", "");
        String login = verifyToken(token, origin);
        Optional<User> user = userDao.get(login);
        if (user.isPresent()) {
            if (user.get().isConnected()) {
                return new ResponseEntity<String>(user.get().getLogin(), HttpStatus.OK);
            } else {
                throw new Exception("L'utilisateur n'est pas connecté");
            }
        } else {
            throw new AuthenticationException("le token à expiré");
        }
    }
}
