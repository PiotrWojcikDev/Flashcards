package com.flashcards.flashcardsapi.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flashcards")
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flashcardId;

    @Column(nullable = false, length = 50)
    private String front;

    @Column(nullable = false, length = 50)
    private String back;

    @ManyToOne
    @JoinColumn(name = "set_id", nullable = false)
    private Set set;
}
