import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './single-set.module.css';

interface Set {
    setId: string;
    setName: string;
    createdAt: string;
    updatedAt: string;
    flashcardCount: number;
}

interface Props {
    setObj: Set;
    onDelete: () => void; 
}

const formatDate = (dateString?: string) => {
    if (!dateString) {
        return '-'; 
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '-'; 
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes} ${day}.${month}.${year}`;
};


const SingleSetComponent: React.FC<Props> = ({ setObj, onDelete }) => {
    const navigate = useNavigate();

    const navigateToSetDetails = () => {
        navigate(`/sets/${setObj.setId}/flashcards`);
    };

    const editSet = () => {
        navigate(`/edit-set/${setObj.setId}`);
    };

    const deleteSet = () => {
        console.log("Delete set" + JSON.stringify(setObj));
        onDelete();
    };

    return (
        <div className={styles.setContainer}>
            <div className={styles.setHeader}>
                <h2>{setObj.setName}</h2>
            </div>
            <div className={styles.setDetails}>
                <p>Data utworzenia: {formatDate(setObj.createdAt)}</p>
                <p>Data modyfikacji: {setObj.updatedAt ? formatDate(setObj.updatedAt) : '-'}</p>
                <p>Liczba fiszek: {setObj.flashcardCount}</p>
            </div>
            <div className={styles.setActions}>
                <button onClick={navigateToSetDetails}>Zobacz</button>
                <button onClick={editSet}>Edytuj</button>
                <button onClick={deleteSet}>Usuń</button>
            </div>
        </div>
    );
    
};

export default SingleSetComponent;
