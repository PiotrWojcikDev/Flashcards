// components/FlashcardsList.tsx
import React, { useState } from 'react';
import SingleFlashcard from '../../components/single-flashcard/single-flashcard';
import './flashcards-list.css'; // Załóżmy, że masz już odpowiednie style

// Przykładowe typy dla propsów
interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface FlashcardsListProps {
  flashcards: Flashcard[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const FlashcardsList: React.FC<FlashcardsListProps> = ({ flashcards, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('');

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.front.toLowerCase().includes(filter.toLowerCase()) ||
    flashcard.back.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flashcards-list-container">
      <input
        type="text"
        placeholder="Filtruj fiszki..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="flashcard-filter-input"
      />
      {filteredFlashcards.map((flashcard) => (
        <SingleFlashcard
          key={flashcard.id}
          flashcard={flashcard}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default FlashcardsList;
