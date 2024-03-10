package fr.univlyon1.m1if.m1if13.users.controller;

import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.Species;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UsersOperationsControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UsersOperationsController usersOperationsController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(usersOperationsController).build();
    }

    @Test
    public void testLoginSuccess() throws Exception {
        User user = new User("john", Species.VILLAGEOIS,"John Doe");
        user.setPassword("password");

        when(userDao.get("john")).thenReturn(Optional.of(user));

        mockMvc.perform(post("/login")
                        .param("login", "john")
                        .param("password", "password"))
                .andExpect(status().isNoContent())
                .andExpect(header().exists("Authentication"));
    }

    @Test
    public void testLoginInvalidCredentials() throws Exception {
        when(userDao.get("john")).thenReturn(Optional.empty());

        mockMvc.perform(post("/login")
                        .param("login", "john")
                        .param("password", "password"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testLoginUserNotFound() throws Exception {
        when(userDao.get("john")).thenReturn(Optional.empty());

        mockMvc.perform(post("/login")
                        .param("login", "john")
                        .param("password", "password"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testLogout() throws Exception {
        mockMvc.perform(post("/logout")
                        .param("login", "john"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testAuthenticateSuccess() throws Exception {
        mockMvc.perform(get("/authenticate")
                        .param("jwt", "valid-jwt-token"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testAuthenticateInvalidToken() throws Exception {
        mockMvc.perform(get("/authenticate")
                        .param("jwt", "invalid-jwt-token"))
                .andExpect(status().isUnauthorized());
    }
}
