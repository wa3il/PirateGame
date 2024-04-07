package fr.univlyon1.m1if.m1if13.users.dao;

import fr.univlyon1.m1if.m1if13.users.Species;
import fr.univlyon1.m1if.m1if13.users.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class UserDao implements Dao<User> {

    private final Map<String, User> users = new HashMap<>();

    public UserDao() {
        users.put("John", new User("John", Species.PIRATE, "password123"));
        users.put("Susan", new User("Susan", Species.VILLAGEOIS, "password456"));
    }

    @Override
    @Operation(summary = "Get user by login", description = "Returns a single user based on the provided login")
    @ApiResponse(responseCode = "200", description = "User found", content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "404", description = "User not found")
    public Optional<User> get(final String id) {
        return Optional.ofNullable(users.get(id));
    }

    @Override
    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    @ApiResponse(responseCode = "200", description = "List of users", content = @Content(schema = @Schema(implementation = User.class)))
    public Set<String> getAll() {
        return this.users.keySet();
    }

    @Override
    @Operation(summary = "Create new user", description = "Creates and saves a new user")
    @ApiResponse(responseCode = "201", description = "User created", content = @Content(schema = @Schema(implementation = User.class)))
    public void save(User user) {
        users.put(user.getLogin(), user);
    }

    @Override
    @Operation(summary = "Update user", description = "Updates an existing user")
    @ApiResponse(responseCode = "204", description = "User updated")
    @ApiResponse(responseCode = "404", description = "User not found")
    public void update(User user, String[] params) {
        if (params[0] != null) {
            user.setPassword(params[0]);
        } else System.out.println("Password cannot be null");
        users.put(user.getLogin(), user);
    }

    @Override
    @Operation(summary = "Delete user", description = "Deletes an existing user")
    @ApiResponse(responseCode = "204", description = "User deleted")
    @ApiResponse(responseCode = "404", description = "User not found")
    public void delete(User user) {
        users.remove(user.getLogin(), user);
    }
}
