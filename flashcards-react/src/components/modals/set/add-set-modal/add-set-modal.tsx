import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './add-set-modal.module.css';
import { getLoggedInUserId } from '../../../../services/auth-service';
import { addSet } from '../../../../services/set-service';

interface FormValues {
    setName: string;
}

interface AddSetModalProps {
    closeAddSetModal: () => void;
    refreshSetsList: () => void;
}

const AddSetModal: React.FC<AddSetModalProps> = ({ closeAddSetModal, refreshSetsList }) => {
    const { register, handleSubmit, formState: { errors, touchedFields, dirtyFields }, setError, clearErrors } = useForm<FormValues>({
        mode: 'onChange', 
    });

    const validateSetName = (value: string) => {
        if (!value.trim()) {
            setError('setName', { type: 'manual', message: '*Pole jest wymagane.' });
        } else {
            clearErrors('setName');
        }
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await addSet({
                userId: getLoggedInUserId(),
                setName: data.setName
            });
            refreshSetsList();
            closeAddSetModal();
        } catch (error) {
            console.log(error);
        }
    };

    const isSubmitButtonDisabled = () => {
        return !!errors.setName || !dirtyFields.setName;
    };

    return (
        <>
            <div className={styles.addSetModalOverlay} onClick={closeAddSetModal}></div>
            <div className={styles.addSetModalContainer}>
                <div className={styles.header}>Dodawanie zbioru</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.content}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                id="setName"
                                className={styles.setName}
                                placeholder="Nazwa zbioru"
                                {...register('setName', {
                                    required: '*Pole jest wymagane.',
                                    onChange: (e) => validateSetName(e.target.value),
                                    onBlur: (e) => validateSetName(e.target.value)
                                })}
                            />
                            {errors.setName && (touchedFields.setName || dirtyFields.setName) && (
                                <span className="formError">{errors.setName.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit" className={styles.btnCustom} disabled={isSubmitButtonDisabled()}>
                            Dodaj zbiór
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={closeAddSetModal}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddSetModal;
