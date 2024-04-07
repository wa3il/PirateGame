package fr.univlyon1.m1if.m1if13.users.controller;

import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.dto.UserDto;
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

import java.util.NoSuchElementException;
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

    @Operation(summary = "Get all users", description = "Retrieve all users from the database." )
    @ApiResponse(responseCode = "200",
            description = "OK", content = {
            @Content(mediaType = "application/json"),
    })
    @GetMapping(value = "/users", produces = { "application/json"})
    public Set<String> getAllUsers() {
        return userDao.getAll();
    }

    @Operation(summary = "Get user by login", description = "Retrieve a user by their login.")
    @ApiResponse(responseCode = "200", description = "User found.", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = User.class))
    })
    @ApiResponse(responseCode = "404", description = "User not found.")
    @GetMapping(value = "/users/{login}", produces = { "application/json"})
    public User getUserByLogin(@Parameter(description = "User login") @PathVariable String login) {
        return userDao.get(login).orElseThrow(() ->
                new NoSuchElementException("User does not exist"));
    }

    @Operation(summary = "Create user", description = "Create a new user.")
    @ApiResponse(responseCode = "201", description = "User created.")
    @PostMapping(value = "/users", consumes = { "application/json"})
    public void createUser(@RequestBody final UserDto userDto) throws Exception {
        if (userDto.getLogin() == null || userDto.getPassword() == null) {
            throw new Exception("Erreur de paramètres");
        }
        userDao.save(new User(userDto.getLogin(), userDto.getSpecies(), userDto.getPassword()));
    }

    @Operation(summary = "Update user password", description = "Update a user's password.")
    @ApiResponse(responseCode = "204", description = "Password updated.")
    @ApiResponse(responseCode = "404", description = "User not found.")
    @PutMapping(value = "/{login}", consumes = { "application/json" })
    public void updateUserPassword(
            @Parameter(description = "User login") @PathVariable String login,
            @Parameter(description = "New password") @RequestParam String password) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(password);
            userDao.update(user, new String[]{password});
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Operation(summary = "Delete user", description = "Delete a user by their login.")
    @ApiResponse(responseCode = "204", description = "User deleted.")
    @ApiResponse(responseCode = "404", description = "User not found.")
    @DeleteMapping(value = "/{login}", produces = { "application/json" })
    public void deleteUser(@Parameter(description = "User login") @PathVariable String login) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userDao.delete(user);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
}
