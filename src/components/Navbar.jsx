// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`navbar-container ${expanded ? 'expanded' : ''}`} id="navbar">
            <div className="navbar-content">
                <div className="navbar-logo">
                    <h3>Apex EV</h3>
                    <img src="vecteezy_free-sports-car-vector_79916.svg" alt="Logo" />
                </div>

                <ul className="navbar-nav">
                    <li><a className="nav-link" href="#">Apex Air</a></li>
                    <li><a className="nav-link" href="#">Apex Gravity</a></li>
                    <li 
                        className="nav-link expand-trigger" 
                        onMouseEnter={() => setExpanded(true)} 
                        onMouseLeave={() => setExpanded(false)}
                    >
                        Experience
                    </li>
                    <li 
                        className="nav-link expand-trigger" 
                        onMouseEnter={() => setExpanded(true)} 
                        onMouseLeave={() => setExpanded(false)}
                    >
                        Shop
                    </li>
                </ul>

                <div className="navbar-icons">
                    <i className="bi bi-question-circle"></i>
                    <i className="bi bi-globe"></i>
                    <div className="dropdown">
                        <i className="bi bi-person-circle dropdown-toggle"></i>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#"><i className="bi bi-person"></i> Account</a></li>
                            <li><a className="dropdown-item" href="#"><i className="bi bi-gear"></i> Settings</a></li>
                            <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right"></i> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;