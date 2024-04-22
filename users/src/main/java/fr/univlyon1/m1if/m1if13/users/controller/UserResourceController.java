package fr.univlyon1.m1if.m1if13.users.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.dto.AuthenticationResponse;
import fr.univlyon1.m1if.m1if13.users.dto.UserRequestDto;
import fr.univlyon1.m1if.m1if13.users.model.User;
import fr.univlyon1.m1if.m1if13.users.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

import static fr.univlyon1.m1if.m1if13.users.controller.Mapdata.getUserDtoRequest;

@RestController
@RequestMapping("/users")
public class UserResourceController {


    @Autowired
    private UserDao userDao;
    private final AuthenticationService authService;

    @Autowired
    public UserResourceController(AuthenticationService authService) {
        this.authService = authService;
    }

    /**
     * Get all users.
     *
     * @return a list of users
     */
    @CrossOrigin(origins = {"http://localhost/", "http://192.168.75.124/", "https://192.168.75.124"})
    @GetMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<Set<String>> getAllUser() {
        return ResponseEntity.ok(userDao.getAll());
    }

    /**
     * Get a user by login.
     *
     * @param login the user login
     * @return the user
     */
    @CrossOrigin(origins = {"http://localhost/", "http://192.168.75.124/", "https://192.168.75.124"})
    @GetMapping(value = "/{login}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> getUser(@PathVariable("login") final String login) {
        Optional<User> user = userDao.get(login);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
    }

    /**
     * Create a user.
     *
     * @param requestBody the request body
     * @param contentType the content type
     * @return the response entity
     */
    @CrossOrigin(origins = {"http://localhost/", "http://192.168.75.124/", "https://192.168.75.124"})
    @PostMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
            )
    public ResponseEntity<AuthenticationResponse> createUser(@RequestBody String requestBody, @RequestHeader("Content-Type") String contentType, @RequestHeader("Origin") String origin) throws JsonProcessingException {
        Optional<UserRequestDto> userRequestDto = getUserDtoRequest(requestBody, contentType);
        if (userRequestDto.isPresent()) {
            return ResponseEntity.ok(authService.register(userRequestDto.get(), origin));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    /**
     * Update a user.
     *
     * @param login       the user login
     * @param requestBody the request body
     * @param contentType the content type
     * @return the response entity
     */
    @CrossOrigin(origins = {"http://localhost/", "http://192.168.75.124/", "https://192.168.75.124"})
    @PutMapping(value = "/{login}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<?> updateUser(
            @PathVariable("login") final String login,
            @RequestBody String requestBody,
            @RequestHeader("Content-Type") String contentType) {
        try {
            Optional<UserRequestDto> requestDto = getUserDtoRequest(requestBody, contentType);
            if (requestDto.isPresent()) {
                Optional<User> user = userDao.get(login);
                if (user.isPresent()) {
                    UserRequestDto userdto = requestDto.get();
                    userDao.update(user.get(), new String[]{userdto.getPassword()});
                    return ResponseEntity.ok("Utilisateur mis à jour");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("Type de média non pris en charge.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur est survenue lors de la mise à jour de l'utilisateur.");
        }
    }

    /**
     * Delete a user.
     *
     * @param login the user login
     * @return the response entity
     */
    @CrossOrigin(origins = {"http://localhost/", "http://192.168.75.124/", "https://192.168.75.124"})
    @DeleteMapping(value = "/{login}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<?> deleteUser(@PathVariable("login") final String login) {
        try {
            Optional<User> user = userDao.get(login);
            if (user.isPresent()) {
                userDao.delete(user.get());
                return ResponseEntity.ok("Utilisateur supprimé");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur est survenue lors de la suppression de l'utilisateur");
        }
    }


}
