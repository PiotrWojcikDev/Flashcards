import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './registration.css'; // Import your styles

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
            // Handle registration logic here, possibly involving an API call
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="content">
            <div className="registration">
                <h2>Rejestracja</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input type="text" name="firstName" className="form-control" placeholder="Imię" value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <span className="text-danger">{errors.firstName}</span>}
                    </div>
                    <div className="field">
                        <input type="text" name="lastName" className="form-control" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <span className="text-danger">{errors.lastName}</span>}
                    </div>
                    <div className="field">
                        <input type="text" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="field">
                        <input type="text" name="phoneNumber" className="form-control" placeholder="Telefon" value={formData.phoneNumber} onChange={handleChange} />
                        {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber}</span>}
                    </div>
                    <div className="field">
                        <input type="password" name="password" className="form-control" placeholder="Hasło" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className="field">
                        <input type="password" name="confirmPassword" className="form-control" placeholder="Potwierdź hasło" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-custom">Zarejestruj się</button>
                        <div className="a-container">
                            <p>Masz już konto?</p>
                            <Link to="/login" className="register-link">Zaloguj się</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationComponent;
