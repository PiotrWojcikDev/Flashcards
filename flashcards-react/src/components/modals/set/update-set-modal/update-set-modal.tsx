import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './update-set-modal.module.css';
import { updateSet } from '../../../../services/set-service';

interface FormValues {
    setName: string;
}

interface UpdateSetModalProps {
    closeUpdateSetModal: () => void;
    refreshSetsList: () => void;
    setObj: {
        setId: string;
        setName: string;
    };
}

const UpdateSetModal: React.FC<UpdateSetModalProps> = ({ closeUpdateSetModal, refreshSetsList, setObj }) => {
    const { register, handleSubmit, formState: { errors, dirtyFields, touchedFields }, setError, clearErrors } = useForm<FormValues>({
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
            await updateSet({
                setId: setObj.setId,
                setName: data.setName
            });
            refreshSetsList();
            closeUpdateSetModal();
        } catch (error) {
            console.error(error);
        }
    };

    const isSubmitButtonDisabled = () => {
        return !!errors.setName || !dirtyFields.setName;
    };

    return (
        <>
            <div className={styles.overlay} onClick={closeUpdateSetModal}></div>
            <div className={styles.updateSetModalcontainer}>
                <div className={styles.header}>Edycja zbioru</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.content}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                id="setName"
                                className={styles.setName}
                                placeholder={setObj.setName}
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
                            Zatwierdź
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={closeUpdateSetModal}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateSetModal;
