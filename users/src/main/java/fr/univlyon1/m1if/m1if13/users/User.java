package fr.univlyon1.m1if.m1if13.users;

import javax.naming.AuthenticationException;

public class User {
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

    public String getLogin() {
        return login;
    }

    public Species getSpecies() {
        return species;
    }

    public void setSpecies(Species species) {
        this.species = species;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isConnected() {
        return this.connected;
    }

    public void authenticate(String password) throws AuthenticationException {
        if(!password.equals(this.password)) {
            throw new AuthenticationException("Erroneous password");
        }
        this.connected = true;
    }

    public void disconnect() {
        this.connected = false;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}