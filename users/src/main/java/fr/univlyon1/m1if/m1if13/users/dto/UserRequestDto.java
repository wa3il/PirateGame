package fr.univlyon1.m1if.m1if13.users.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import fr.univlyon1.m1if.m1if13.users.model.Species;

@JacksonXmlRootElement(localName = "user")
public class UserRequestDto {
    private String login;
    private String password;
    private Species species;

    public UserRequestDto() {
    }

    public UserRequestDto(String login, String password, Species species) {
        this.login = login;
        this.password = password;
        this.species = species;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Species getSpecies() {return species;}

    public void setSpecies(Species species) {this.species = species;}

}
