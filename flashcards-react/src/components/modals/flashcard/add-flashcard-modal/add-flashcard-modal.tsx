import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './add-flashcard-modal.module.css'; 
import { addFlashcard } from '../../../../services/flashcard-service';
import { useParams } from 'react-router-dom';

interface FormValues {
    front: string;
    back: string;
}

interface AddFlashcardModalProps {
    closeAddFlashcardModal: () => void;
    refreshFlashcardList: () => void;
}

const AddFlashcardModal: React.FC<AddFlashcardModalProps> = ({ closeAddFlashcardModal, refreshFlashcardList }) => {
    const { setId } = useParams();
    const { register, handleSubmit, formState: { errors, touchedFields, dirtyFields }, setError, clearErrors } = useForm<FormValues>({
        mode: 'onChange',
    });
    

    const validateField = (field: 'front' | 'back', value: string) => {
        if (!value.trim()) {
            setError(field, { type: 'manual', message: '*Pole jest wymagane.' });
        } else {
            clearErrors(field);
        }
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await addFlashcard({
                setId: setId,
                front: data.front,
                back: data.back
            });
            refreshFlashcardList();
            closeAddFlashcardModal();
        } catch (error) {
            console.log(error);
        }
    };

    const isSubmitButtonDisabled = () => {
        return !!errors.front || !!errors.back || !dirtyFields.front || !dirtyFields.back;
    };

    return (
        <>
            <div className={styles.addFlashcardModalOverlay} onClick={closeAddFlashcardModal}></div>
            <div className={styles.addFlashcardModalContainer}>
                <div className={styles.header}>Dodawanie fiszki</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.content}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                id="front"
                                className={styles.input}
                                placeholder="Przód fiszki"
                                {...register('front', {
                                    required: '*Pole jest wymagane.',
                                    onChange: (e) => validateField('front', e.target.value),
                                    onBlur: (e) => validateField('front', e.target.value)
                                })}
                            />
                            {errors.front && (touchedFields.front || dirtyFields.front) && (
                                <span className="formError">{errors.front.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                id="back"
                                className={styles.input}
                                placeholder="Tył fiszki"
                                {...register('back', {
                                    required: '*Pole jest wymagane.',
                                    onChange: (e) => validateField('back', e.target.value),
                                    onBlur: (e) => validateField('back', e.target.value)
                                })}
                            />
                            {errors.back && (touchedFields.back || dirtyFields.back) && (
                                <span className="formError">{errors.back.message}</span>
                            )}
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit" disabled={isSubmitButtonDisabled()}>
                            Dodaj fiszkę
                        </button>
                        <button type="button" onClick={closeAddFlashcardModal}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddFlashcardModal;