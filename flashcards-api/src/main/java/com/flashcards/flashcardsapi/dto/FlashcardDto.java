package com.flashcards.flashcardsapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardDto {
    private Long flashcardId;
    private String front;
    private String back;
    private Long setId;  // ID zestawu, do którego należy fiszka
}
