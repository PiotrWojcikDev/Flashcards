import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/navbar';
import { loginService, login } from '../../../services/auth-service';
import styles from './login.module.css';
import { validateLoginField } from '../../../validators/validators';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginComponent = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, dirtyFields, isValid, isSubmitting },
        setError,
        clearErrors
    } = useForm<LoginFormValues>({
        mode: 'onChange',
        
    });


    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await loginService(data);
            login(response.userId);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    const isSubmitButtonDisabled = () => {
        return !isValid || isSubmitting || !!errors.email || !!errors.password;
    };

    return (
        <>
            <Navbar />
            <div className={styles.loginContainer}>
                <div className={styles.login}>
                    <h2>Logowanie</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.field}>
                            <input
                                type="text"
                                placeholder="Email"
                                {...register('email', {
                                    required: '*Email jest wymagany.',
                                    onChange: (e) => validateLoginField('email', e.target.value, setError, clearErrors),
                                    onBlur: (e) => validateLoginField('email', e.target.value, setError, clearErrors)
                                })}
                            />
                            {errors.email && (touchedFields.email || dirtyFields.email) && (
                                <span className="formError">{errors.email.message}</span>
                            )}
                        </div>
                        <div className={styles.field}>
                            <input
                                type="password"
                                placeholder="Hasło"
                                {...register('password', {
                                    required: '*Hasło jest wymagane.',
                                    onChange: (e) => validateLoginField('password', e.target.value, setError, clearErrors),
                                    onBlur: (e) => validateLoginField('password', e.target.value, setError, clearErrors)
                                })}
                            />
                            {errors.password && (touchedFields.password || dirtyFields.password) && (
                                <span className="formError">{errors.password.message}</span>
                            )}
                        </div>
                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.loginButton}
                                disabled={isSubmitButtonDisabled()}
                            >
                                Zaloguj się
                            </button>
                            <div className={styles.linkContainer}>
                                <p>Nie masz konta?</p>
                                <Link to="/register" className={styles.registerLink}>Zarejestruj się</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
