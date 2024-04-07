package fr.univlyon1.m1if.m1if13.users.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.univlyon1.m1if.m1if13.users.Species;

public class UserLoginDto {
    private String login;
    private String password;
    private Species species;

    public UserLoginDto() {
    }

    @JsonCreator
    public UserLoginDto(@JsonProperty("login") final String login, @JsonProperty final Species species,
                   @JsonProperty("password") final String password) {
        this.login = login;
        this.species = species;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(final String login) {
        this.login = login;
    }

    public Species getSpecies() {return species;}

    public void setSpecies(final Species species) {
        this.species = species;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}

