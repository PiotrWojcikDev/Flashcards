import React, { useState, FormEvent } from 'react';
import styles from './login.module.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from '../../../components/navbar/navbar';

interface FormErrors {
    email: string;
    password: string;
}

const LoginComponent = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
    const navigate = useNavigate(); 

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        console.log();
    };
    return (
        <>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.login}>
                    <h2>Logowanie</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                        <div className={styles.field}>
                            <input type="password" placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} />
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                        <div className={styles.formActions}>
                            <button type="submit">Zaloguj się</button>
                            <div className={styles.linkContainer}>
                                <p>Nie masz konta?</p>
                                <Link to="/register">Zarejestruj się</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
