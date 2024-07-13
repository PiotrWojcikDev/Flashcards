package com.flashcards.flashcardsapi.controllers;

import com.flashcards.flashcardsapi.dto.LoginDto;
import com.flashcards.flashcardsapi.dto.UserDto;
import com.flashcards.flashcardsapi.models.User;
import com.flashcards.flashcardsapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User newUser = new User();
        newUser.setFirstName(userDto.getFirstName());
        newUser.setLastName(userDto.getLastName());
        newUser.setEmail(userDto.getEmail());
        newUser.setPhoneNumber(userDto.getPhoneNumber());
        newUser.setPassword(userDto.getPassword()); // Bez szyfrowania
        newUser.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        userRepository.save(newUser);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully!");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElse(null);

        if (user == null || !user.getPassword().equals(loginDto.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid email or password");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User logged in successfully!");
        response.put("userId", user.getUserId());

        return ResponseEntity.ok(response);
    }
}