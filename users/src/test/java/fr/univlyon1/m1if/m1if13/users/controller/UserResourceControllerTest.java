package fr.univlyon1.m1if.m1if13.users.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.dto.AuthenticationResponse;
import fr.univlyon1.m1if.m1if13.users.dto.UserRequestDto;
import fr.univlyon1.m1if.m1if13.users.model.Species;
import fr.univlyon1.m1if.m1if13.users.model.User;
import fr.univlyon1.m1if.m1if13.users.security.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class UserResourceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserDao userDao;

    @MockBean
    private AuthenticationService authService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUser() throws Exception {
        // Given
        Set<String> userLogins = Set.of("Anny", "François");
        when(userDao.getAll()).thenReturn(userLogins);

        // When
        mockMvc.perform(MockMvcRequestBuilders.get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(userLogins)));

        // Then
        verify(userDao, times(1)).getAll();
    }

    @Test
    void testGetUserFound() throws Exception {
        // Given
        String login = "Anny";
        User user = new User(login, Species.PIRATE, "password");
        when(userDao.get(login)).thenReturn(Optional.of(user));

        // When
        mockMvc.perform(MockMvcRequestBuilders.get("/users/{login}", login)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(user)));

        // Then
        verify(userDao, times(1)).get(login);
    }

    @Test
    void testGetUserNotFound() throws Exception {
        // Given
        String login = "Unknown";
        when(userDao.get(login)).thenReturn(Optional.empty());

        // When
        mockMvc.perform(MockMvcRequestBuilders.get("/users/{login}", login)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        // Then
        verify(userDao, times(1)).get(login);
    }
    /*
    @Test
    void testCreateUser() throws Exception {
        // Given
        UserRequestDto userRequestDto = new UserRequestDto("NewUser", "password", Species.VILLAGEOIS);
        String requestBody = objectMapper.writeValueAsString(userRequestDto);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse("jwt_token");
        when(authService.register(userRequestDto)).thenReturn(authenticationResponse);

        // When
        mockMvc.perform(MockMvcRequestBuilders.post("/users")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt").value(authenticationResponse.getToken()));

        // Then
        verify(authService, times(1)).register(userRequestDto);
    }*/

}