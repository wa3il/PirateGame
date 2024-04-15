package fr.univlyon1.m1if.m1if13.users.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.univlyon1.m1if.m1if13.users.dto.AuthenticationRequest;
import fr.univlyon1.m1if.m1if13.users.dto.UserRequestDto;
import fr.univlyon1.m1if.m1if13.users.model.Species;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Extract form data from a request body.
 */
@SuppressWarnings("checkstyle:HideUtilityClassConstructor")
@Component
public class Mapdata {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static Map<String, String> extractFormData(String requestBody) {
        Map<String, String> formData = new HashMap<>();
        String[] pairs = requestBody.split("&");
        for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
                String key = keyValue[0];
                String value = keyValue[1];
                try {
                    value = URLDecoder.decode(value, "UTF-8");
                } catch (Exception e) {
                    // Ignore or handle the exception
                }
                formData.put(key, value);
            }
        }
        return formData;
    }

    public static Optional<UserRequestDto> getUserDtoRequest(String requestBody, String contentType) throws JsonProcessingException {
        if (contentType.contains(MediaType.APPLICATION_JSON_VALUE)) {
            UserRequestDto userRequest = objectMapper.readValue(requestBody, UserRequestDto.class);
            if (userRequest.getLogin() == null) {
                return Optional.empty();
            } else {
                return Optional.of(userRequest);
            }
        }
        if (contentType.contains(MediaType.APPLICATION_FORM_URLENCODED_VALUE)) {
            Map<String, String> formData = extractFormData(requestBody);
            String login = formData.get("login");
            String password = formData.get("password");
            String species = formData.get("species");

            UserRequestDto userRequest = new UserRequestDto();
            userRequest.setLogin(login);
            userRequest.setPassword(password);
            userRequest.setSpecies(Species.valueOf(species));
            if (login == null) {
                return Optional.empty();
            }
            return Optional.of(userRequest);
        }
        return Optional.empty();

    }

    public static Optional<AuthenticationRequest> getAuthRequest(String requestBody, String contentType) throws JsonProcessingException {
        if (contentType.contains(MediaType.APPLICATION_JSON_VALUE)) {
            AuthenticationRequest authRequest = objectMapper.readValue(requestBody, AuthenticationRequest.class);
            if (authRequest.getToken() == null) {
                return Optional.empty();
            } else {
                return Optional.of(authRequest);
            }
        }
        if (contentType.contains(MediaType.APPLICATION_FORM_URLENCODED_VALUE)) {
            Map<String, String> formData = extractFormData(requestBody);
            String token = formData.get("token");
            AuthenticationRequest authRequest = new AuthenticationRequest(token);
            if (token == null) {
                return Optional.empty();
            }else {
                authRequest.setToken(token);
                return Optional.of(authRequest);
            }
        }
        return Optional.empty();

    }



}
