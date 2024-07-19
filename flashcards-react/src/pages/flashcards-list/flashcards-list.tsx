import React, { useEffect, useState } from 'react';
import styles from './flashcards-list.module.css'; 
import Navbar from '../../components/navbar/navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SingleFlashcardComponent from '../../components/single-flashcard/single-flashcard';

interface Flashcard {
  flashcardId: string;
  front: string;
  back: string;
}

const FlashcardsListComponent = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
      fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
      const mockFlashcards: Flashcard[] = [
          { flashcardId: '1', front: 'czerwony', back: 'red' },
          { flashcardId: '2', front: 'niebieski', back: 'blue' },
          { flashcardId: '2', front: 'zielony', back: 'green' }
      ];
      setFlashcards(mockFlashcards);
  };

  const filteredFlashcards = flashcards.filter(flashcard =>
      flashcard.front.toLowerCase().includes(filterText.toLowerCase())
  );

  const updateFlashcard = (id: string) => {
    console.log('Update flashcard', id);
  };

  const deleteFlashcard = (id: string) => {
      console.log('Delete flashcard', id);
  };

  return (
    <>
      <Navbar/>
      <div className={styles.flashcardsListContainer}>
        <h2>Fiszki w zbiorze <i>Nazwa zbioru</i>  (Liczba)</h2>

        <div className={styles.filterContainer}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Filtruj fiszki" />
        </div>

        <div className={styles.flashcardsList}>
          <div className={styles.actions}>
            <button className={styles.learnButton}>
              Tryb nauki&nbsp;
              <i className="fa-solid fa-graduation-cap"></i>
            </button>
            <button className={styles.addButton}>
              Dodaj fiszki&nbsp;
              <i className="fa-solid fa-plus fa-sm"></i>
            </button>
          </div>
          {filteredFlashcards.map(flashcard => (
                    <SingleFlashcardComponent
                        key={flashcard.flashcardId}
                        flashcardObj={flashcard}
                        onUpdate={() => updateFlashcard(flashcard.flashcardId)}
                        onDelete={() => deleteFlashcard(flashcard.flashcardId)}
                    />
                ))}
        </div>
      </div>
    </>
  );
};

export default FlashcardsListComponent;
