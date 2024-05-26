package fr.univlyon1.m1if.m1if13.users.dao;

import java.util.*;

import fr.univlyon1.m1if.m1if13.users.model.Species;
import fr.univlyon1.m1if.m1if13.users.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao implements Dao<User> {
    private List<User> users = new ArrayList<User>();

    public UserDao() {
        users.add(new User("Anny", Species.PIRATE, "milsabor"));
        users.add(new User("François", Species.VILLAGEOIS, "ChaussureNoire"));
        users.add(new User("John", Species.ADMIN, "John"));
    }

    public Optional<User> findByLogin(String login) {
        return users.stream()
                .filter(u -> u.getUsername().equals(login))
                .findFirst();
    }

    @Override
    public Optional<User> get(String login) {
        return users.stream().filter(u -> u.getUsername().equals(login)).findFirst();
    }

    @Override
    public Set<String> getAll(){
        List<String> logins = new ArrayList<>();
        for (User u : users) {
            logins.add(u.getUsername());
        }
        return Set.copyOf(logins);
    }

    @Override
    public void save(User u) {
        users.add(u);
    }

    @Override
    public void update(User u, String[] params) {
        u.setPassword(Objects.requireNonNull(params[0], "Password cannot be null"));
    }

    @Override
    public void delete(User u) {
        users.remove(u);
    }

    public Optional<User> findByJwt(String jwt) {
        return users.stream()
                .filter(u -> u.getJwt().equals(jwt))
                .findFirst();
    }
}
