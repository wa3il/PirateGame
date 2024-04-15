package fr.univlyon1.m1if.m1if13.users.dto;

/*
    * Authentication request.
 */
public class AuthenticationRequest {
    private String token;

    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {this.token = token;}
}
