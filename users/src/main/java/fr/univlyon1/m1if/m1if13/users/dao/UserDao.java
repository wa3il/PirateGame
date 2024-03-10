package fr.univlyon1.m1if.m1if13.users.dao;

import fr.univlyon1.m1if.m1if13.users.Species;
import fr.univlyon1.m1if.m1if13.users.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Objects;

@Component
public class UserDao implements Dao<User> {

    private final List<User> users = new ArrayList<>();

    public UserDao() {
        users.add(new User("John", Species.PIRATE, "password123"));
        users.add(new User("Susan", Species.VILLAGEOIS, "password456"));
    }

    @Override
    @Operation(summary = "Get user by login", description = "Returns a single user based on the provided login")
    @ApiResponse(responseCode = "200", description = "User found", content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "404", description = "User not found")
    public Optional<User> get(String login) {
        return users.stream()
                .filter(user -> user.getLogin().equals(login))
                .findFirst();
    }

    @Override
    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    @ApiResponse(responseCode = "200", description = "List of users", content = @Content(schema = @Schema(implementation = User.class)))
    public Set<User> getAll() {
        return new HashSet<>(users);
    }

    @Override
    @Operation(summary = "Create new user", description = "Creates and saves a new user")
    @ApiResponse(responseCode = "201", description = "User created", content = @Content(schema = @Schema(implementation = User.class)))
    public void save(User user) {
        users.add(user);
    }

    @Override
    @Operation(summary = "Update user", description = "Updates an existing user")
    @ApiResponse(responseCode = "204", description = "User updated")
    @ApiResponse(responseCode = "404", description = "User not found")
    public void update(User user, String[] params) {
        user.setPassword(Objects.requireNonNull(
                params[0], "Password cannot be null"));
        users.add(user);
    }

    @Override
    @Operation(summary = "Delete user", description = "Deletes an existing user")
    @ApiResponse(responseCode = "204", description = "User deleted")
    @ApiResponse(responseCode = "404", description = "User not found")
    public void delete(User user) {
        users.remove(user);
    }
}
