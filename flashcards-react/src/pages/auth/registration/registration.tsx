import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import { registerService } from '../../../services/auth-service';
import styles from './registration.module.css';
import { validateRegistrationField } from '../../../validators/validators';

interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

const RegistrationComponent = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        setError,
        clearErrors,
        getValues
    } = useForm<RegistrationFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
        try {
            await registerService(data);
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.registrationContainer}>
                <div className={styles.registration}>
                    <h2>Rejestracja</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Imię"
                                {...register('firstName', {
                                    required: '*Imię jest wymagane.',
                                    onChange: (e) => validateRegistrationField('firstName', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('firstName', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.firstName && (
                                <span className="formError">{errors.firstName.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Nazwisko"
                                {...register('lastName', {
                                    required: '*Nazwisko jest wymagane.',
                                    onChange: (e) => validateRegistrationField('lastName', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('lastName', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.lastName && (
                                <span className="formError">{errors.lastName.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Email"
                                {...register('email', {
                                    required: '*Email jest wymagany.',
                                    onChange: (e) => validateRegistrationField('email', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('email', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.email && (
                                <span className="formError">{errors.email.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Telefon"
                                {...register('phoneNumber', {
                                    required: '*Numer telefonu jest wymagany.',
                                    onChange: (e) => validateRegistrationField('phoneNumber', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('phoneNumber', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.phoneNumber && (
                                <span className="formError">{errors.phoneNumber.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="password"
                                placeholder="Hasło"
                                {...register('password', {
                                    required: '*Hasło jest wymagane.',
                                    onChange: (e) => validateRegistrationField('password', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('password', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.password && (
                                <span className="formError">{errors.password.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="password"
                                placeholder="Potwierdź hasło"
                                {...register('confirmPassword', {
                                    required: '*Potwierdzenie hasła jest wymagane.',
                                    onChange: (e) => validateRegistrationField('confirmPassword', e.target.value, setError, clearErrors, getValues),
                                    onBlur: (e) => validateRegistrationField('confirmPassword', e.target.value, setError, clearErrors, getValues)
                                })}
                            />
                            {errors.confirmPassword && (
                                <span className="formError">{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.registerButton}
                                disabled={!isValid || isSubmitting}
                            >
                                Zarejestruj się
                            </button>
                            <div className={styles.linkContainer}>
                                <p>Masz już konto?</p>
                                <Link to="/login" className={styles.loginLink}>Zaloguj się</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationComponent;
