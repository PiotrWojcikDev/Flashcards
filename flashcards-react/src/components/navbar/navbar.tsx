import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Upewnij się, że plik CSS jest dołączony
import logo from '../../assets/images/logo.png'; 

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Logo" />

                </Link>
                <button className="navbar-toggler" onClick={toggleNavbar}>Menu</button>
                <div className={`navbar-links ${navbarOpen ? 'active' : ''}`}>
                    <Link to="/about">O aplikacji</Link>
                    <Link to="/login">Logowanie</Link>
                    <Link to="/register">Rejestracja</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
