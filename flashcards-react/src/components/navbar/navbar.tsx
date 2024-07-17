import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';  // Upewnij się, że plik CSS jest dołączony
import logo from '../../assets/images/logo.png'; 

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Logo" />
                </Link>
                <div className="navbar-links">
                    <Link to="/about">O aplikacji</Link>
                    <Link to="/login">Logowanie</Link>
                    <Link to="/register">Rejestracja</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
