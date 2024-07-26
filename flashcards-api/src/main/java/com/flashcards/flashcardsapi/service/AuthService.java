package com.flashcards.flashcardsapi.service;

import com.flashcards.flashcardsapi.dto.LoginDto;
import com.flashcards.flashcardsapi.dto.UserDto;
import com.flashcards.flashcardsapi.models.User;

public interface AuthService {
    User registerUser(UserDto userDto);
    User loginUser(LoginDto loginDto);
}
