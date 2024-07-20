import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from'./navbar.module.css';
import logo from '../../assets/images/logo.png'; 
import { getLoggedInUserId, logout } from '../../services/auth-service';

const Navbar = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = getLoggedInUserId();
        setIsUserLoggedIn(!!userId);
    }, []);

    const handleLogout = () => {
        logout();
        setIsUserLoggedIn(false);
        navigate('/login'); 
    };
    
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <Link to="/" className={styles.navbarLogo}>
                    <img src={logo} alt="Logo" />
                </Link>                
                {isUserLoggedIn ? 
                    (<>
                        <div className={styles.navbarLinks}>
                            <NavLink end to='/' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink}>
                                O aplikacji
                            </NavLink>
                            <NavLink to='/sets' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink}>
                                Zbiory
                            </NavLink>
                            <NavLink to='/login' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink} onClick={handleLogout}>
                                Wyloguj się
                            </NavLink>
                         </div>
                    </>) 
                    : 
                    (<>
                        <div className={styles.navbarLinks}>
                            <NavLink end to='/' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink}>
                                O aplikacji
                            </NavLink>
                            <NavLink to='/login' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink}>
                                Logowanie
                            </NavLink>
                            <NavLink to='/register' className={({isActive})=>isActive ? styles.activeLink : styles.standardLink}>
                                Rejestracja
                            </NavLink>
                        </div>
                    </>)
                }          
            </div>
        </nav>
    );
};

export default Navbar;
