import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
import Navbar from '../../../components/navbar/navbar';

interface FormErrors {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

const RegistrationComponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors: FormErrors = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: ''
        };

        if (!formData.firstName) {
            newErrors.firstName = '*Imię jest wymagane.';
            valid = false;
        }

        if (!formData.lastName) {
            newErrors.lastName = '*Nazwisko jest wymagane.';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = '*Email jest wymagany.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '*Email jest niepoprawny.';
            valid = false;
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = '*Numer telefonu jest wymagany.';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = '*Hasło jest wymagane.';
            valid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = '*Hasła nie są takie same.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Registration data:', formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <div className={styles.registrationContainer}>
                <div className={styles.registration}>
                    <h2>Rejestracja</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <input type="text" name="firstName" placeholder="Imię" value={formData.firstName} onChange={handleChange} />
                            {errors.firstName && <span>{errors.firstName}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="text" name="lastName" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} />
                            {errors.lastName && <span>{errors.lastName}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="text" name="phoneNumber" placeholder="Telefon" value={formData.phoneNumber} onChange={handleChange} />
                            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="password" name="password" placeholder="Hasło" value={formData.password} onChange={handleChange} />
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="password" name="confirmPassword" placeholder="Potwierdź hasło" value={formData.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.registerButton}>Zarejestruj się</button>
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
