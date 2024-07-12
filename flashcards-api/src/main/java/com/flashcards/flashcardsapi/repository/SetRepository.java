package com.flashcards.flashcardsapi.repository;

import com.flashcards.flashcardsapi.models.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetRepository extends JpaRepository<Set, Long> {
    @Query("SELECT s FROM Set s WHERE s.user.userId = :userId")
    List<Set> findByUserId(@Param("userId") Long userId);
}
