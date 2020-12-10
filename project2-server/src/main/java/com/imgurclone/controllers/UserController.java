package com.imgurclone.controllers;

import com.imgurclone.models.SignUpRequest;
import com.imgurclone.models.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("users")
@RestController
public class UserController {

    @GetMapping(path = "/")
    public ResponseEntity<User> getAllUsers() {

        System.out.println("This endpoint works");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "createUser")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        System.out.println(newUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
