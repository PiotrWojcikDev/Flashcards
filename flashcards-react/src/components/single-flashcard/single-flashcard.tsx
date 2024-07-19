import React from 'react';
import styles from './single-flashcard.module.css'; 

interface Flashcard {
  flashcardId: string;
  front: string;
  back: string;
}

interface Props {
  flashcardObj: Flashcard;
  onUpdate: () => void;
  onDelete: () => void;
}

const SingleFlashcardComponent: React.FC<Props> = ({ flashcardObj, onUpdate, onDelete }) => {
  return (
      <div className={styles.flashcardContainer}>
          <div className={styles.flashcardDetails}>
              <p className={styles.paragraphMargin}>{flashcardObj.front}</p>
              <p className={styles.paragraphMargin}></p>
              <p className={styles.paragraphMargin}>{flashcardObj.back}</p>
          </div>
          <div className={styles.flashcardActions}>
              <button onClick={onUpdate}>Edytuj</button>
              <button onClick={onDelete}>Usuń</button>
          </div>
      </div>
  );
};

export default SingleFlashcardComponent;