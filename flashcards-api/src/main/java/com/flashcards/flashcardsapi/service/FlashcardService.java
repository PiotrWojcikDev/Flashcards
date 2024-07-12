package com.flashcards.flashcardsapi.service;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Flashcard;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FlashcardService {
    FlashcardDto addFlashcard(FlashcardDto flashcardDto);
    boolean deleteFlashcard(Long id) throws ResourceNotFoundException;
    FlashcardDto updateFlashcard(Long flashcardId, FlashcardDto flashcardDto) throws ResourceNotFoundException;

    // Deklaracja dodatkowych metod
}
