import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './learning-finished-modal.module.css'; 

const LearningFinishedModal = () => {
    const navigate = useNavigate(); 

    const navigateToSets = () => {
        navigate(`/sets`); 
    };

    const continueLearning = () => {
        navigate(0);
    };

    return (
        <>
            <div className={styles.learningOverlay}></div>
            <div className={styles.learningFinishedModalContainer}>
                <div className={styles.header}>Gratulacje!</div>
                <div className={styles.content}>
                Ukończyłeś naukę wszystkich fiszek w tym zbiorze!
                </div>
                <div className={styles.actions}>
                    <button onClick={continueLearning}>Kontynuuj naukę</button>
                    <button onClick={navigateToSets}>Do zbiorów</button>
                </div>
            </div>
        </>
    );
};

export default LearningFinishedModal;
