package fr.univlyon1.m1if.m1if13.users;

import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;

import java.util.Optional;

/**
 * Main class to run the Users Application.
 */
@SpringBootApplication(exclude = { ThymeleafAutoConfiguration.class })
public class UsersApplication {

	private static UserDao userDao;

	public static void main(String[] args) {
		userDao = new UserDao();

		User user1 = getUser("John");
		System.out.println(user1);
		userDao.update(user1, new String[]{"password123"});

		User user2 = getUser("Susan");
		userDao.delete(user2);
		userDao.save(new User("Julie", Species.VILLAGEOIS,"password567"));

		userDao.getAll().forEach(user -> System.out.println(user.getLogin() + " - " + user.getSpecies()));
	}

	private static User getUser(String login) {
		Optional<User> user = userDao.get(login);

		return user.orElseGet(
				() -> new User("non-existing user", Species.VILLAGEOIS, "no-email"));
	}
}
