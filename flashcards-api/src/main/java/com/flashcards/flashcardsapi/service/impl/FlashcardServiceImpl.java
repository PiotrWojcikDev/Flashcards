package com.flashcards.flashcardsapi.service.impl;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Flashcard;
import com.flashcards.flashcardsapi.models.Set;
import com.flashcards.flashcardsapi.repository.FlashcardRepository;
import com.flashcards.flashcardsapi.repository.SetRepository;
import com.flashcards.flashcardsapi.service.FlashcardService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlashcardServiceImpl implements FlashcardService {

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private SetRepository setRepository;


    @Override
    @Transactional
    public FlashcardDto addFlashcard(FlashcardDto flashcardDto) {
        Set set = setRepository.findById(flashcardDto.getSetId())
                .orElseThrow(() -> new ResourceNotFoundException("Set not found"));

        Flashcard flashcard = new Flashcard();
        flashcard.setFront(flashcardDto.getFront());
        flashcard.setBack(flashcardDto.getBack());
        flashcard.setSet(set);

        Flashcard savedFlashcard = flashcardRepository.save(flashcard);
        return convertToFlashcardDto(savedFlashcard);
    }

    @Override
    @Transactional
    public void deleteFlashcard(Long id) throws ResourceNotFoundException {
        if (!flashcardRepository.existsById(id)) {
            throw new ResourceNotFoundException("Flashcard not found with id " + id);
        }
        flashcardRepository.deleteById(id);
    }

    @Override
    @Transactional
    public FlashcardDto updateFlashcard(Long flashcardId, FlashcardDto flashcardDto) {
        Flashcard flashcard = flashcardRepository.findById(flashcardId)
                .orElseThrow(() -> new ResourceNotFoundException("Flashcard not found"));

        flashcard.setFront(flashcardDto.getFront());
        flashcard.setBack(flashcardDto.getBack());

        Flashcard updatedFlashcard = flashcardRepository.save(flashcard);
        return convertToFlashcardDto(updatedFlashcard);
    }


    private FlashcardDto convertToFlashcardDto(Flashcard flashcard) {
        FlashcardDto dto = new FlashcardDto();
        dto.setFlashcardId(flashcard.getFlashcardId());
        dto.setFront(flashcard.getFront());
        dto.setBack(flashcard.getBack());
        return dto;
    }
}
