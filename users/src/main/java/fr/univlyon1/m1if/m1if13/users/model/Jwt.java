package fr.univlyon1.m1if.m1if13.users.model;

/**
 * Jwt model.
 */
public class Jwt {

    private String token;
    private boolean desactive;
    private boolean expire;

    public Jwt() {}

    public Jwt(String token,boolean desactive, boolean expire, String login) {
        this.token = token;
        this.desactive = desactive;
        this.expire = expire;
    }


}
