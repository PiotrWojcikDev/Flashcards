package com.flashcards.flashcardsapi.service;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.dto.SetDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Flashcard;
import com.flashcards.flashcardsapi.models.Set;

import java.util.List;

public interface SetService {
    SetDto createSet(SetDto setDto);
    List<FlashcardDto> getFlashcardsBySetId(Long setId);
    SetDto getSetById(Long setId);
    void deleteSet(Long id) throws ResourceNotFoundException;
    SetDto updateSet(Long id, SetDto setDto) throws ResourceNotFoundException;
    List<SetDto> getAllSetsByUserId(Long userId);
}
