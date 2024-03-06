package fr.univlyon1.m1if.m1if13.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserDao userDao;

    @Autowired
    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    // Get all users
    @GetMapping
    public ResponseEntity<Set<User>> getAllUsers() {
        Set<User> users = userDao.getAll();
        return ResponseEntity.ok(users);
    }

    // Get user by login
    @GetMapping("/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login) {
        Optional<User> user = userDao.get(login);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create user
    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody User user) {
        userDao.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // Update user password
    @PutMapping("/{login}")
    public ResponseEntity<Void> updateUserPassword(@PathVariable String login, @RequestParam String password) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(password);
            userDao.update(user, new String[]{password});
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user
    @DeleteMapping("/{login}")
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        Optional<User> userOptional = userDao.get(login);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userDao.delete(user);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
