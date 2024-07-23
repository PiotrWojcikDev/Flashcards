import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './update-flashcard-modal.module.css'; 
import { updateFlashcard } from '../../../../services/flashcard-service'; 

interface FormValues {
    front: string;
    back: string;
}

interface UpdateFlashcardModalProps {
    closeUpdateFlashcardModal: () => void;
    refreshFlashcardsList: () => void;
    flashcardObj: {
        flashcardId: string;
        front: string;
        back: string;
    };
}

const UpdateFlashcardModal: React.FC<UpdateFlashcardModalProps> = ({ closeUpdateFlashcardModal, refreshFlashcardsList, flashcardObj }) => {
    const { register, handleSubmit, formState: { errors, touchedFields, dirtyFields }, setError, clearErrors } = useForm<FormValues>({
        mode: 'onChange'
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
            await updateFlashcard({
                flashcardId: flashcardObj.flashcardId, 
                front: data.front,
                back: data.back
            });
            refreshFlashcardsList();
            closeUpdateFlashcardModal(); 
        } catch (error) {
            console.log(error);
        }
    };

    const isSubmitButtonDisabled = () => {
        return !!errors.front || !!errors.back || !dirtyFields.front || !dirtyFields.back;
    };

    return (
        <>
            <div className={styles.updateFlashcardModalOverlay} onClick={closeUpdateFlashcardModal}></div>
            <div className={styles.updateFlashcardModalContainer}>
                <div className={styles.header}>Edytowanie fiszki</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.content}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                id="front"
                                className={styles.input}
                                placeholder={flashcardObj.front}
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
                                placeholder={flashcardObj.back}
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
                            Zatwierdź
                        </button>
                        <button type="button" onClick={closeUpdateFlashcardModal}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateFlashcardModal;
