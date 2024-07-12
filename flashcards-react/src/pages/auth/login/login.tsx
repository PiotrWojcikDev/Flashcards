import React, { useState, FormEvent } from 'react';
import './login.css'; // Import your styles
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

interface FormErrors {
    email: string;
    password: string;
}

const LoginComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
    const navigate = useNavigate(); // Hook to handle navigation

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors: FormErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = '*Email jest wymagany.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = '*Email jest niepoprawny.';
            valid = false;
        }

        if (!password) {
            newErrors.password = '*Hasło jest wymagane.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Submit form:', { email, password });
            // Handle login logic here
            // Assuming the login is successful, we navigate to the 'sets' page
            navigate('/sets');
        }
    };

    return (
        <div className="content">
            <div className="login">
                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="field">
                        <input type="password" className="form-control" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-custom">Zaloguj się</button>
                        <div className="a-container">
                            <p>Nie masz konta?</p>
                            <Link to="/register" className="register-link">Zarejestruj się</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
