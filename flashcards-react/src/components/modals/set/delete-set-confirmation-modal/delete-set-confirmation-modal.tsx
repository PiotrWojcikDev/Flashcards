import React from 'react';
import styles from './delete-set-confirmation-modal.module.css';
import { deleteSet } from '../../../../services/set-service';

interface DeleteSetConfirmationModalProps {
    closeDeleteSetModal: () => void;
    refreshSetsList: () => void;
    setObj: {
        setId: string;
        setName: string;
    };
}

const DeleteSetConfirmationModal: React.FC<DeleteSetConfirmationModalProps> = ({ closeDeleteSetModal, refreshSetsList, setObj }) => {

    const handleDelete = async () => {
        try {
            await deleteSet(setObj.setId);
            refreshSetsList();
            closeDeleteSetModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.overlay} onClick={closeDeleteSetModal}></div>
            <div className={styles.deleteSetModalContainer}>
                <div className={styles.header}>Usuwanie zbioru</div>
                <div className={styles.content}>
                    Czy na pewno chcesz usunąć zbiór <i>{setObj.setName}</i>?
                </div>
                <div className={styles.actions}>
                    <button onClick={handleDelete} className={styles.btnCustom}>Usuń</button>
                    <button onClick={closeDeleteSetModal} className={styles.cancelBtn}>Anuluj</button>
                </div>
            </div>
        </>
    );
};

export default DeleteSetConfirmationModal;
