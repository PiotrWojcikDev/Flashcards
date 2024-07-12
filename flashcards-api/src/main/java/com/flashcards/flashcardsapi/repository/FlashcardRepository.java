package com.flashcards.flashcardsapi.repository;

import com.flashcards.flashcardsapi.models.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
    @Query("SELECT f FROM Flashcard f WHERE f.set.setId = :setId")
    List<Flashcard> findBySetId(Long setId);

    void deleteById(Long id);
}
