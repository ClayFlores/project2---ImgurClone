package com.imgurclone.controllers;

import com.imgurclone.daos.UserDao;
import com.imgurclone.models.AuthenticationRequest;
import com.imgurclone.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("users")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserDao userDao;

    @GetMapping(path = "/")
    public ResponseEntity<User> getAllUsers() {

        System.out.println("This endpoint works");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "createUser")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(newUser.getPasswordHash());
        newUser.setPasswordHash(hashedPassword);
        userDao.save(newUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User userResult = userDao.getByEmail(authenticationRequest.getEmail());
        boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), userResult.getPasswordHash());
        System.out.println("THE PASSWORDS ARE THE SAME AND WE ARE AUTHENTICATED: " + authenticated);
        return new ResponseEntity<>(userResult, HttpStatus.OK);
    }


}
