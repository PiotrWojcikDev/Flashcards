package com.flashcards.flashcardsapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class SetDto {
    private Long setId;
    private String setName;
    private Date createdAt;
    private Date updatedAt;
    private Integer flashcardCount;
    private Long userId;
    private List<FlashcardDto> flashcards;

}