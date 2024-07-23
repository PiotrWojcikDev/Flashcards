import React from 'react';
import styles from './delete-flashcard-confirmation-modal.module.css';
import { deleteFlashcard } from '../../../../services/flashcard-service'; 

interface DeleteFlashcardConfirmationModalProps {
    closeDeleteFlashcardModal: () => void;
    refreshFlashcardsList: () => void;
    flashcardObj: {
        flashcardId: string;
        front: string;
    };
}

const DeleteFlashcardConfirmationModal: React.FC<DeleteFlashcardConfirmationModalProps> = ({ closeDeleteFlashcardModal, refreshFlashcardsList, flashcardObj }) => {
    
    const handleDelete = async () => {
        try {
            await deleteFlashcard(flashcardObj.flashcardId);
            refreshFlashcardsList();
            closeDeleteFlashcardModal();
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    };

    return (
        <>
            <div className={styles.overlay} onClick={closeDeleteFlashcardModal}></div>
            <div className={styles.deleteFlashcardModalContainer}>
                <div className={styles.header}>Usuwanie fiszki</div>
                <div className={styles.content}>
                    Czy na pewno chcesz usunąć fiszkę <i>{flashcardObj.front}</i>?
                </div>
                <div className={styles.actions}>
                    <button onClick={handleDelete}>Usuń</button>
                    <button onClick={closeDeleteFlashcardModal}>Anuluj</button>
                </div>
            </div>
        </>
    );
};

export default DeleteFlashcardConfirmationModal;
