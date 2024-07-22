import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './single-set.module.css';
import UpdateSetModal from '../modals/set/update-set-modal/update-set-modal';
import DeleteSetModal from '../modals/set/delete-set-confirmation-modal/delete-set-confirmation-modal';

interface Set {
    setId: string;
    setName: string;
    createdAt: string;
    updatedAt: string;
    flashcardCount: number;
}

interface Props {
    setObj: Set;
    onUpdate: () => void; 
    onDelete: () => void; 
    refreshSetsList: () => void;
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


const SingleSetComponent: React.FC<Props> = ({ setObj,  refreshSetsList }) => {
    const navigate = useNavigate();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const navigateToSetDetails = () => {
        navigate(`/sets/${setObj.setId}/flashcards`);
    };

    const handleUpdate = () => {
        setShowUpdateModal(true);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const closeUpdateSetModal = () => {
        setShowUpdateModal(false);
    };

    const closeDeleteSetModal = () => {
        setShowDeleteModal(false);
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
                <button onClick={handleUpdate}>Edytuj</button>
                <button onClick={handleDelete}>Usuń</button>
            </div>
            {showUpdateModal && (
                <UpdateSetModal
                    setObj={setObj}
                    closeUpdateSetModal={closeUpdateSetModal}
                    refreshSetsList={refreshSetsList}
                />
            )}
            {showDeleteModal && (
                <DeleteSetModal
                    setObj={setObj}
                    closeDeleteSetModal={closeDeleteSetModal}
                    refreshSetsList={refreshSetsList}
                />
            )}
        </div>
    );
    
};

export default SingleSetComponent;
