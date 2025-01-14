package fr.univlyon1.m1if.m1if13.users.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import fr.univlyon1.m1if.m1if13.users.dto.AuthenticationResponse;
import fr.univlyon1.m1if.m1if13.users.dto.UserRequestDto;
import fr.univlyon1.m1if.m1if13.users.security.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static fr.univlyon1.m1if.m1if13.users.controller.Mapdata.getUserDtoRequest;

@RestController
@RequestMapping("/users")
public class UsersOperationsController {
    private final AuthenticationService authenticationService;

    @Autowired
    public UsersOperationsController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Procédure de login utilisée par un utilisateur
     * parametre login et mdp
     * @return Une ResponseEntity avec le JWT dans le header "Authorization" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @PostMapping(value = "/login",
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    public ResponseEntity<AuthenticationResponse> login(@RequestBody String requestBody, @RequestHeader("Content-Type") String contentType, @RequestHeader("Origin") String origin) throws JsonProcessingException {
        Optional<UserRequestDto> userRequest = getUserDtoRequest(requestBody, contentType);
        if (userRequest.isPresent()) {
            try
            {
                return ResponseEntity.ok(authenticationService.authenticate(userRequest.get(),origin));
            }
            catch (Exception e)
            {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Réalise la déconnexion
     */
    @PostMapping(value = "/logout")
    public ResponseEntity<Void> logout(@RequestBody String requestBody, @RequestHeader("Content-Type") String contentType) throws JsonProcessingException {
        Optional<UserRequestDto> userRequest = getUserDtoRequest(requestBody, contentType);
        if (userRequest.isPresent()) {
            authenticationService.logout(userRequest.get().getLogin());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param jwt Le token JWT qui se trouve dans le header "Authorization" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
    */
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("jwt") String jwt, @RequestParam("origin") String origin) {
        try {
              authenticationService.tokenUserConnected(jwt, origin);
              return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
    }

}