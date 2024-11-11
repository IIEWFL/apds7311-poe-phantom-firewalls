import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'; // Import global styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li><NavLink to="/register" className="nav-link">Register</NavLink></li>
                <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                <li><NavLink to="/transactions" className="nav-link">Transactions</NavLink></li>
                <li><NavLink to="/protected" className="nav-link">Protected</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
