package fr.univlyon1.m1if.m1if13.users.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.univlyon1.m1if.m1if13.users.User;
import fr.univlyon1.m1if.m1if13.users.Species;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {
    /*

    private MockMvc mockMvc;

    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testGetAllUsers() throws Exception {
        Set<User> users = new HashSet<>();
        users.add(new User("john", Species.VILLAGEOIS, "John Doe"));
        users.add(new User("jane", Species.VILLAGEOIS, "Jane Smith"));

        when(userDao.getAll()).thenReturn(users);

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].login").value("john"))
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[1].login").value("jane"))
                .andExpect(jsonPath("$[1].name").value("Jane Smith"));
    }

    @Test
    public void testGetUserByLogin() throws Exception {
        User user = new User("john", Species.VILLAGEOIS, "John Doe");

        when(userDao.get("john")).thenReturn(Optional.of(user));

        mockMvc.perform(get("/users/john"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.login").value("john"))
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    public void testCreateUser() throws Exception {
        User user = new User("john", Species.VILLAGEOIS,"John Doe");

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testUpdateUserPassword() throws Exception {
        User user = new User("john", Species.VILLAGEOIS,"John Doe");

        when(userDao.get("john")).thenReturn(Optional.of(user));

        mockMvc.perform(put("/users/john")
                        .param("password", "newpassword"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testDeleteUser() throws Exception {
        User user = new User("john", Species.VILLAGEOIS,"John Doe");

        when(userDao.get("john")).thenReturn(Optional.of(user));

        mockMvc.perform(delete("/users/john"))
                .andExpect(status().isNoContent());
    }

     */
}
