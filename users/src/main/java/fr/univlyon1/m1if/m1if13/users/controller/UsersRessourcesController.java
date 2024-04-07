package fr.univlyon1.m1if.m1if13.users.controller;

import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping("/users")
public class UsersRessourcesController {

    private final UserDao userDao;

    @Autowired
    public UsersRessourcesController(UserDao userDao) {
        this.userDao = userDao;
    }

    @Operation(summary = "Get all users", description = "Retrieve all users from the database.")
    @GetMapping(produces = { "application/json", "application/xml", "text/html" })
    public ResponseEntity<Set<User>> getAllUsers() {
        Set<User> users = userDao.getAll();
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "Get user by login", description = "Retrieve a user by their login.")
    @ApiResponse(responseCode = "200", description = "User found.", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = User.class)),
            @Content(mediaType = "application/xml", schema = @Schema(implementation = User.class)),
            @Content(mediaType = "text/html", schema = @Schema(implementation = User.class))
    })
    @ApiResponse(responseCode = "404", description = "User not found.")
    @GetMapping(value = "/{login}", produces = { "application/json", "application/xml", "text/html" })
    public ResponseEntity<User> getUserByLogin(@Parameter(description = "User login") @PathVariable String login) {
        Optional<User> user = userDao.get(login);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Operation(summary = "Create user", description = "Create a new user.")
    @ApiResponse(responseCode = "201", description = "User created.")
    @PostMapping(consumes = { "application/json", "application/xml", "application/x-www-form-urlencoded" })
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userDao.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Update user password", description = "Update a user's password.")
    @ApiResponse(responseCode = "204", description = "Password updated.")
    @ApiResponse(responseCode = "404", description = "User not found.")
    @PutMapping(value = "/{login}", consumes = { "application/json", "application/xml", "application/x-www-form-urlencoded" })
    public ResponseEntity<Void> updateUserPassword(
            @Parameter(description = "User login") @PathVariable String login,
            @Parameter(description = "New password") @RequestParam String password) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(password);
            userDao.update(user, new String[]{password});
            return ResponseEntity.noContent().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Operation(summary = "Delete user", description = "Delete a user by their login.")
    @ApiResponse(responseCode = "204", description = "User deleted.")
    @ApiResponse(responseCode = "404", description = "User not found.")
    @DeleteMapping(value = "/{login}", produces = { "application/json", "application/xml", "text/html" })
    public ResponseEntity<Void> deleteUser(@Parameter(description = "User login") @PathVariable String login) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userDao.delete(user);
            return ResponseEntity.noContent().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
