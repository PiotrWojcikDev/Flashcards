package com.flashcards.flashcardsapi.controllers;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Flashcard;
import com.flashcards.flashcardsapi.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    @Autowired
    private FlashcardService flashcardService;

    @PostMapping("/addFlashcard")
    public ResponseEntity<FlashcardDto> addFlashcard(@RequestBody FlashcardDto flashcardDto) {
        FlashcardDto savedFlashcard = flashcardService.addFlashcard(flashcardDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFlashcard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Long id) {
        flashcardService.deleteFlashcard(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{flashcardId}")
    public ResponseEntity<FlashcardDto> updateFlashcard(@PathVariable Long flashcardId, @RequestBody FlashcardDto flashcardDto) {
        FlashcardDto updatedFlashcard = flashcardService.updateFlashcard(flashcardId, flashcardDto);
        return ResponseEntity.ok(updatedFlashcard);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
