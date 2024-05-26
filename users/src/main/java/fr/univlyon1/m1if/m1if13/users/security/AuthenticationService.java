package fr.univlyon1.m1if.m1if13.users.security;

import fr.univlyon1.m1if.m1if13.users.dao.UserDao;
import fr.univlyon1.m1if.m1if13.users.dto.AuthenticationResponse;
import fr.univlyon1.m1if.m1if13.users.dto.UserRequestDto;
import fr.univlyon1.m1if.m1if13.users.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(UserDao userDao, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    public AuthenticationResponse register(UserRequestDto userRequestDto, String origin) {
        User user = new User(userRequestDto.getLogin(),userRequestDto.getSpecies(), passwordEncoder.encode(userRequestDto.getPassword()));
        if (userDao.findByLogin(userRequestDto.getLogin()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        user.setConnected(true);
        String jwt = jwtService.generateToken(user, origin);
        user.setJwt(jwt);
        userDao.save(user);
        return new AuthenticationResponse(jwt);
    }

    public AuthenticationResponse authenticate(UserRequestDto userRequestDto, String origin) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userRequestDto.getLogin(),
                        userRequestDto.getPassword()
                ));
        Optional<User> user = userDao.findByLogin(userRequestDto.getLogin());
        if(user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        else if (user.get().getJwt() != null) {
            user.get().setConnected(true);
            if (jwtService.isTokenValid(user.get().getJwt(), user.get())){
                return new AuthenticationResponse(user.get().getJwt());
            }
            else {
                user.get().setJwt(null);
                String jwt = jwtService.generateToken(user.get(), origin);
                user.get().setJwt(jwt);
                return new AuthenticationResponse(jwt);
            }
        }
        else {
            user.get().setConnected(true);
            String jwt = jwtService.generateToken(user.get(), origin);
            user.get().setJwt(jwt);
            return new AuthenticationResponse(jwt);
        }
    }

    public void logout(String login){
        Optional<User> user = userDao.findByLogin(login);
        user.ifPresent(value -> {
            value.setJwt(null);
            value.setConnected(false);
        });
    }

    public void tokenUserConnected(String token, String origin){
        String login = jwtService.extractUserLogin(token);
        String userOrigin = jwtService.extractUserOrigin(token);
        Optional<User> user = userDao.findByLogin(login);
        if(user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        else if (user.get().getJwt() == null) {
            throw new RuntimeException("User not connected");
        }else if (!user.get().getJwt().equals(token) || !userOrigin.equals(origin)){
            throw new RuntimeException("Token not valid");
        }
    }

}

