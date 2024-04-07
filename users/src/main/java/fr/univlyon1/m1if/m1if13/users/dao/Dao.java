package fr.univlyon1.m1if.m1if13.users.dao;

import fr.univlyon1.m1if.m1if13.users.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Component
public interface Dao<T> {

    @Operation(summary = "Get user by login", description = "Returns a single user based on the provided login")
    @ApiResponse(responseCode = "200", description = "User found", content = @Content(schema = @Schema(implementation = User.class)))
    @ApiResponse(responseCode = "404", description = "User not found")
    Optional<T> get(String id);

    @Operation(summary = "Get all users", description = "Returns a list of all registered users")
    @ApiResponse(responseCode = "200", description = "List of users", content = @Content(schema = @Schema(implementation = User.class)))
    Set<String> getAll();

    @Operation(summary = "Create new user", description = "Creates and saves a new user")
    @ApiResponse(responseCode = "201", description = "User created", content = @Content(schema = @Schema(implementation = User.class)))
    void save(T t);

    @Operation(summary = "Update user", description = "Updates an existing user")
    @ApiResponse(responseCode = "204", description = "User updated")
    @ApiResponse(responseCode = "404", description = "User not found")
    void update(T t, String[] params);

    @Operation(summary = "Delete user", description = "Deletes an existing user")
    @ApiResponse(responseCode = "204", description = "User deleted")
    @ApiResponse(responseCode = "404", description = "User not found")
    void delete(T t);
}
