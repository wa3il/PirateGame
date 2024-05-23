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
public class UsersOperationsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationService authenticationService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /*
    @Test
    void testLogin() throws Exception {
        // Given
        UserRequestDto userRequestDto = new UserRequestDto("Anny", "password", Species.PIRATE);
        String requestBody = objectMapper.writeValueAsString(userRequestDto);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse("jwt_token");
        when(authenticationService.authenticate(userRequestDto)).thenReturn(authenticationResponse);

        // When
        mockMvc.perform(MockMvcRequestBuilders.post("/users/login")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwt_token").value(authenticationResponse.getToken()));

        // Then
        verify(authenticationService, times(1)).authenticate(userRequestDto);
    }*/

    @Test
    void testLogout() throws Exception {
        // Given
        UserRequestDto userRequestDto = new UserRequestDto("Anny", "password", Species.PIRATE);
        String requestBody = objectMapper.writeValueAsString(userRequestDto);

        // When
        mockMvc.perform(MockMvcRequestBuilders.post("/users/logout")
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // Then
        verify(authenticationService, times(1)).logout(userRequestDto.getLogin());
    }
}