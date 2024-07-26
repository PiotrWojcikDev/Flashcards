package com.flashcards.flashcardsapi.controllers;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.dto.SetDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Set;
import com.flashcards.flashcardsapi.service.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sets")
public class SetController {

    @Autowired
    private SetService setService;

    @PostMapping("/addSet")
    public ResponseEntity<SetDto> addSet(@RequestBody SetDto setDto) {
        SetDto savedSetDto = setService.createSet(setDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSetDto);
    }

    @GetMapping("/{setId}")
    public ResponseEntity<SetDto> getSetById(@PathVariable Long setId) {
        try {
            SetDto setDto = setService.getSetById(setId);
            return ResponseEntity.ok(setDto);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SetDto>> getSetsByUserId(@PathVariable Long userId) {
        List<SetDto> sets = setService.getAllSetsByUserId(userId);
        return ResponseEntity.ok(sets);
    }

    @GetMapping("/{setId}/flashcards")
    public ResponseEntity<List<FlashcardDto>> getFlashcardsBySetId(@PathVariable Long setId) {
        List<FlashcardDto> flashcards = setService.getFlashcardsBySetId(setId);
        return ResponseEntity.ok(flashcards);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSet(@PathVariable Long id) {
        setService.deleteSet(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SetDto> updateSet(@PathVariable Long id, @RequestBody SetDto setDto) {
        SetDto updatedSet = setService.updateSet(id, setDto);
        return ResponseEntity.ok(updatedSet);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGlobalException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
    }
}