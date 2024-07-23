import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/navbar/navbar';
import styles from './learn.module.css';
import LearningFinishedModal from '../../components/modals/learn/learning-finished-modal/learning-finished-modal';
import { useParams } from 'react-router-dom';
import { getAllFlashcardsBySetId } from '../../services/set-service';

interface Flashcard {
  front: string;
  back: string;
  learned: boolean;
}

const LearnComponent = () => {
  const { setId } = useParams();
  const [allFlashcards, setAllFlashcards] = useState<Flashcard[]>([]);
  const [totalNumberOfFlashcards, setTotalNumberOfFlashcards] = useState(0);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showLearningFinishedModal, setShowLearningFinishedModal] = useState(false);


  useEffect(() => {
    remainingCards();
  }, []);

  useEffect(() => {
    if (setId) {  
      fetchFlashcards(setId); 
    }
  }, [setId]);

  const fetchFlashcards = async (id: string) => {
    try {
      let fetchedFlashcards = await getAllFlashcardsBySetId(id); 
      fetchedFlashcards = fetchedFlashcards.map((flashcard: Flashcard) => ({ ...flashcard, learned: false }));
      setAllFlashcards(fetchedFlashcards); 
      setTotalNumberOfFlashcards(fetchedFlashcards.length);
    } catch (error) {
      console.error("Error fetching flashcards:", error); 
    }
  };

  const getNextFlashcard = () => {
    if (currentFlashcardIndex < allFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      const incorrectFlashcards = allFlashcards.filter(flashcard => !flashcard.learned);
      if (incorrectFlashcards.length === 0) {
        setShowLearningFinishedModal(true);
      } else {
        setAllFlashcards(incorrectFlashcards);
        setCurrentFlashcardIndex(0);
      }
    }
  };

  const answerFlashcard = (isCorrect: boolean) => {
    const currentFlashcard = allFlashcards[currentFlashcardIndex];

    if (isCorrect) {
      currentFlashcard.learned = true;
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    getNextFlashcard();
  };

  const remainingCards = () => {
    return allFlashcards.filter(flashcard => !flashcard.learned).length;
  };

  return (
    <>
      <Navbar />
      <div className={styles.learnContainer}>
        <p>Do nauczenia: {remainingCards()} / {totalNumberOfFlashcards}</p>
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
            {incorrectAnswers}
          </div>
        </div>
      </div>
      {showLearningFinishedModal && <LearningFinishedModal />}
    </>
  );
};

export default LearnComponent;