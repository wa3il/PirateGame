package fr.univlyon1.m1if.m1if13.users;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Procédure de login utilisée par un utilisateur
     * @param login Le login de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param password Le password à vérifier.
     * @return Une ResponseEntity avec le JWT dans le header "Authentication" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestParam("login") String login, @RequestParam("password") String password) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(password)) {
                String jwtToken = generateToken(login);
                return ResponseEntity.status(HttpStatus.NO_CONTENT)
                        .header("Authentication", jwtToken)
                        .build();
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Procédure de logout utilisée par un utilisateur
     * @param login Le login de l'utilisateur.
     * @return Une ResponseEntity avec le code de statut approprié (204 ou 404).
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestParam("login") String login) {
        // Pas besoin de déconnexion, on supprime juste le token
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     * @param jwt Le token JWT qui se trouve dans le header "Authentication" de la requête
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("jwt") String jwt) {
        if (validateToken(jwt)) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
