package fr.univlyon1.m1if.m1if13.users.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.naming.AuthenticationException;
import java.util.Collection;

/**
 * User entity.
 */
@JacksonXmlRootElement(localName = "user")
public class User implements UserDetails {

    private final String login;
    private Species species;
    private String password;
    // Permet d'invalider une connexion même si le token est toujours valide
    private boolean connected = false;
    // Nom du fichier image qui représentera l'utilisateur sur la carte
    private String image;

    public User(String login, Species species, String password) {
        this.login = login;
        this.species = species;
        this.password = password;
    }

    public User(String login, Species species, String password, String image) {
        this.login = login;
        this.species = species;
        this.password = password;
        this.image = image;
    }

    /**
     * @return
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    /**
     * @return
     */
    @Override
    public String getPassword() {return this.password;}

    public void setPassword(String password) {this.password = password;}

    /**
     * @return
     */
    @Override
    public String getUsername() {return this.login;}

    public Species getSpecies() {
        return species;
    }

    public void setSpecies(Species species) {
        this.species = species;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {this.image = image;}

    public void authenticate(String password) throws AuthenticationException {
        if(!password.equals(this.password)) {
            throw new AuthenticationException("Erroneous password");
        }
        this.connected = true;
    }

    public void disconnect() {
        this.connected = false;
    }

    /**
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {return true;}

    /**
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {return true;}

    /**
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {return true;}

    /**
     * @return
     */
    @Override
    public boolean isEnabled() {return true;}


}