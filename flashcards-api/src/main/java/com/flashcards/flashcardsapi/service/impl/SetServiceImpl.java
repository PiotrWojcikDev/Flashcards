package com.flashcards.flashcardsapi.service.impl;

import com.flashcards.flashcardsapi.dto.FlashcardDto;
import com.flashcards.flashcardsapi.dto.SetDto;
import com.flashcards.flashcardsapi.exceptions.ResourceNotFoundException;
import com.flashcards.flashcardsapi.models.Set;
import com.flashcards.flashcardsapi.models.Flashcard;
import com.flashcards.flashcardsapi.models.User;
import com.flashcards.flashcardsapi.repository.FlashcardRepository;
import com.flashcards.flashcardsapi.repository.SetRepository;
import com.flashcards.flashcardsapi.repository.UserRepository;
import com.flashcards.flashcardsapi.service.SetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SetServiceImpl implements SetService {
    @Autowired
    private SetRepository setRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public SetDto createSet(SetDto setDto) {
        Set set = new Set();
        set.setSetName(setDto.getSetName());

        User user = userRepository.findById(setDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + setDto.getUserId()));

        set.setUser(user);
        set.setCreatedAt(new Date());
        set.setFlashcardCount(0);
        Set savedSet = setRepository.save(set);

        return convertToSetDto(savedSet);
    }

    public SetDto getSetById(Long setId) {
        Set set = setRepository.findById(setId)
                .orElseThrow(() -> new ResourceNotFoundException("Set not found with id " + setId));
        return convertToSetDto(set);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FlashcardDto> getFlashcardsBySetId(Long setId) {
        Set set = setRepository.findById(setId).orElseThrow(() -> new ResourceNotFoundException("Set not found"));
        return set.getFlashcards().stream().map(this::convertToFlashcardDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteSet(Long id) {
        if (!setRepository.existsById(id)) {
            throw new ResourceNotFoundException("Set not found with id " + id);
        }
        setRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SetDto updateSet(Long id, SetDto setDto) throws ResourceNotFoundException {
        Set existingSet = setRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Set not found with id " + id));

        existingSet.setSetName(setDto.getSetName());
        Set updatedSet = setRepository.save(existingSet);

        SetDto updatedSetDto = new SetDto();
        updatedSetDto.setSetId(updatedSet.getSetId());
        updatedSetDto.setSetName(updatedSet.getSetName());

        return updatedSetDto;
    }

    @Transactional(readOnly = true)
    public List<SetDto> getAllSetsByUserId(Long userId) {
        List<Set> sets = setRepository.findByUserId(userId);
        return sets.stream().map(this::convertToSetDto).collect(Collectors.toList());
    }


    private SetDto convertToSetDto(Set set) {
        SetDto dto = new SetDto();
        dto.setSetId(set.getSetId());
        dto.setSetName(set.getSetName());
        dto.setCreatedAt(set.getCreatedAt());
        dto.setUpdatedAt(set.getUpdatedAt());
        dto.setFlashcardCount(set.getFlashcardCount());
        return dto;
    }

    private FlashcardDto convertToFlashcardDto(Flashcard flashcard) {
        FlashcardDto dto = new FlashcardDto();
        dto.setFlashcardId(flashcard.getFlashcardId());
        dto.setFront(flashcard.getFront());
        dto.setBack(flashcard.getBack());
        return dto;
    }
}
