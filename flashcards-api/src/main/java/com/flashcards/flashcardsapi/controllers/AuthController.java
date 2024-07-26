package com.flashcards.flashcardsapi.controllers;

import com.flashcards.flashcardsapi.dto.LoginDto;
import com.flashcards.flashcardsapi.dto.UserDto;
import com.flashcards.flashcardsapi.models.User;
import com.flashcards.flashcardsapi.repository.UserRepository;
import com.flashcards.flashcardsapi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;


    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        try {
            User newUser = authService.registerUser(userDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        try {
            User user = authService.loginUser(loginDto);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User logged in successfully!");
            response.put("userId", user.getUserId());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}