package fr.univlyon1.m1if.m1if13.users.servlet;

import fr.univlyon1.m1if.m1if13.users.UsersApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(UsersApplication.class);
	}

}
