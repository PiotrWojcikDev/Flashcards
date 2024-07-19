import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import styles from './learn.module.css';

interface Flashcard {
  front: string;
  back: string;
}

const LearnComponent = () => {
  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [inCorrectAnswers, setInCorrectAnswers] = useState(0);
  const [showLearningFinishedModal, setShowLearningFinishedModal] = useState(false);

  useEffect(() => {
    const mockFlashcards: Flashcard[] = [
        { front: 'czerwony', back: 'red' },
        { front: 'niebieski', back: 'blue' },
        { front: 'zielony', back: 'green' }
    ];
    setAllFlashcards(mockFlashcards);
  }, []);

  const answerFlashcard = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setInCorrectAnswers(inCorrectAnswers + 1);
    }

    if (currentFlashcardIndex < allFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      setShowLearningFinishedModal(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.learnContainer}>
        <p>Do nauczenia: {allFlashcards.length - currentFlashcardIndex} / {allFlashcards.length}</p>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.front}>
              <p>{allFlashcards[currentFlashcardIndex]?.front}</p>
            </div>
            <div className={styles.back}>
              <p>{allFlashcards[currentFlashcardIndex]?.back}</p>
            </div>
          </div>
        </div>

        <div className={styles.response}>
          <button className={styles.knowButton} onClick={() => answerFlashcard(true)}>
            Znam
          </button>
          <button className={styles.unknownButton} onClick={() => answerFlashcard(false)}>
            Nie wiem
          </button>
        </div>

        <div className={styles.results}>
          <div className={styles.correct}>
            <i className="fa-solid fa-check"></i>
            {correctAnswers}
          </div>
          <div className={styles.incorrect}>
            <i className="fa-solid fa-xmark"></i>
            {inCorrectAnswers}
          </div>
        </div>
      </div>
      {/* {showLearningFinishedModal && <LearningFinishedModal />} */}
    </>
  );
};

export default LearnComponent;