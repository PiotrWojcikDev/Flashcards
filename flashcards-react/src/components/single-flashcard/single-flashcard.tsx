// components/SingleFlashcard.jsx
import React from 'react';
import './single-flashcard.css'; // Załóżmy, że masz już odpowiednie style

// Przykładowe typy dla propsów
interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface SingleFlashcardProps {
  flashcard: Flashcard;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SingleFlashcard: React.FC<SingleFlashcardProps> = ({ flashcard, onEdit, onDelete }) => {
  return (
    <div className="flashcard-container">
      <div className="flashcard-details">
        <p className="paragraph-margin">{flashcard.front}</p>
        <div className="paragraph-margin"></div> {/* Pusty element jako separator */}
        <p className="paragraph-margin">{flashcard.back}</p>
      </div>
      <div className="flashcard-actions">
        <button onClick={() => onEdit(flashcard.id)}>Edytuj</button>
        <button onClick={() => onDelete(flashcard.id)}>Usuń</button>
      </div>
    </div>
  );
};

export default SingleFlashcard;
