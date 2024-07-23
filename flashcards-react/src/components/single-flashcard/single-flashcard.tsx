import React, { useState } from 'react';
import styles from './single-flashcard.module.css'; 
import DeleteFlashcardConfirmationModal from '../modals/flashcard/delete-flashcard-confirmation/delete-flashcard-confirmation-modal';
import UpdateFlashcardModal from '../modals/flashcard/update-flashcard-modal/update-flashcard-modal';

interface Flashcard {
  flashcardId: string;
  front: string;
  back: string;
}

interface Props {
  flashcardObj: Flashcard;
  refreshFlashcardsList: () => void;
}

const SingleFlashcardComponent: React.FC<Props> = ({ flashcardObj, refreshFlashcardsList }) => {
  const [showUpdateFlashcardModal, setShowUpdateFlashcardModal] = useState(false); 
  const [showDeleteFlashcardModal, setShowDeleteFlashcardModal] = useState(false); 


  const openUpdateFlashcardModal = () => {
    setShowUpdateFlashcardModal(true); 
  };

  const closeUpdateFlashcardModal = () => {
      setShowUpdateFlashcardModal(false); 
  };

  const openDeleteFlashcardModal = () => {
      setShowDeleteFlashcardModal(true); 
  };

  const closeDeleteFlashcardModal = () => {
      setShowDeleteFlashcardModal(false); 
  };
  
  return (
      <div className={styles.flashcardContainer}>
          <div className={styles.flashcardDetails}>
              <p className={styles.paragraphMargin}>{flashcardObj.front}</p>
              <p className={styles.paragraphMargin}></p>
              <p className={styles.paragraphMargin}>{flashcardObj.back}</p>
          </div>
          <div className={styles.flashcardActions}>
              <button onClick={openUpdateFlashcardModal}>Edytuj</button>
              <button onClick={openDeleteFlashcardModal}>Usuń</button>
          </div>
          {showDeleteFlashcardModal && ( 
            <DeleteFlashcardConfirmationModal
                closeDeleteFlashcardModal={closeDeleteFlashcardModal}
                refreshFlashcardsList={refreshFlashcardsList}
                flashcardObj={flashcardObj}
            />
          )}
          {showUpdateFlashcardModal && ( 
            <UpdateFlashcardModal
                closeUpdateFlashcardModal={closeUpdateFlashcardModal}
                refreshFlashcardsList={refreshFlashcardsList}
                flashcardObj={flashcardObj}
            />
          )}
      </div>
  );
};

export default SingleFlashcardComponent;