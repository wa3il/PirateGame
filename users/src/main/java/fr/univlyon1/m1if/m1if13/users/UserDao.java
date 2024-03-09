package fr.univlyon1.m1if.m1if13.users;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Objects;
import org.springframework.stereotype.Component;

@Component
public class UserDao implements Dao<User> {

    private final List<User> users = new ArrayList<>();

    public UserDao() {
        users.add(new User("John", Species.PIRATE, "password123"));
        users.add(new User("Susan", Species.VILLAGEOIS, "password456"));
    }

    @Override
    public Optional<User> get(String login) {
        return users.stream()
                .filter(user -> user.getLogin().equals(login))
                .findFirst();
    }

    @Override
    public Set<User> getAll() {
        return new HashSet<>(users);
    }

    @Override
    public void save(User user) {
        users.add(user);
    }

    @Override
    public void update(User user, String[] params) {
        user.setPassword(Objects.requireNonNull(
                params[0], "Password cannot be null"));
        users.add(user);
    }

    @Override
    public void delete(User user) {
        users.remove(user);
    }
}
