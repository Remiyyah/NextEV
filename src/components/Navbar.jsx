import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import './Navbar.css';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const closeMenu = () => setActiveMenu(null);
    const openMenu = (menu) => setActiveMenu(menu);

    return (
        <div 
            className={`navbar-container ${activeMenu ? 'expanded' : ''}`} 
            id="navbar"
            onMouseLeave={closeMenu}
        >
            <div className="navbar-content">
                <div className="navbar-logo" onMouseEnter={closeMenu}>
                    <h3>Apex EV</h3>
                    <img src="car-logo.svg" alt="Logo" />
                </div>

                <ul className="navbar-nav">
                    <li>
                        <a className="nav-link expand-trigger" href="#air" onMouseEnter={() => openMenu('apex-air')}>
                            Apex Air
                        </a>
                    </li>
                    <li>
                        <a className="nav-link expand-trigger" href="#gravity" onMouseEnter={() => openMenu('apex-gravity')}>
                            Apex Gravity
                        </a>
                    </li>
                    <li>
                        <a className="nav-link expand-trigger" href="#preowned" onMouseEnter={() => openMenu('experience')}>
                            Pre-Owned
                        </a>
                    </li>
                    <li>
                        <a className="nav-link expand-trigger" href="#discover" onMouseEnter={() => openMenu('shop')}>
                            Discover
                        </a>
                    </li>
                </ul>

                <div className="navbar-icons" onMouseEnter={closeMenu}>
                    <i className="bi bi-question-circle"></i>
                    <i className="bi bi-globe"></i>
                    <div className="dropdown">
                        {/* Added onClick and pointer cursor to the icon */}
                        <i 
                            className="bi bi-person-circle dropdown-toggle"
                            onClick={() => navigate('/login')}
                            style={{ cursor: 'pointer' }}
                            title="Login"
                        ></i>
                    </div>
                </div>
            </div>

            {/* --- MEGA MENUS --- */}
            
            <div id="apex-air-menu" className={`expanded-menu-content ${activeMenu === 'apex-air' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        <li><a href="#pure" className="fade-in">Air Pure</a></li>
                        <li><a href="#touring" className="fade-in">Air Touring</a></li>
                        <li><a href="#grand-touring" className="fade-in">Air Grand Touring</a></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <a href="#gallery1" className="fade-in"><img src="/img/air1.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery2" className="fade-in"><img src="/img/air2.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery3" className="fade-in"><img src="/img/air3.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery4" className="fade-in"><img src="/img/air4.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery5" className="fade-in"><img src="img/air5.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                </div>
            </div>

            <div id="apex-gravity-menu" className={`expanded-menu-content ${activeMenu === 'apex-gravity' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        <li><a href="#features" className="fade-in">Gravity Features</a></li>
                        <li><a href="#reserve" className="fade-in">Reserve Yours</a></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <a href="#learn" className="fade-in"><img src="/img/gravity1.webp" alt="Apex Gravity" /></a>
                        <h4 className="fade-in">Learn More</h4>
                    </div>
                    <div className="image-box">
                        <a href="#reservations" className="fade-in"><img src="img/gravity2.webp" alt="Reserve Gravity" /></a>
                        <h4 className="fade-in">Reservations</h4>
                    </div>
                </div>
            </div>

            <div id="experience-menu" className={`expanded-menu-content ${activeMenu === 'experience' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        <li><a href="#cpo" className="fade-in">Certified Pre-Owned</a></li>
                        <li><a href="#tech" className="fade-in">Our Technology</a></li>
                        <li><a href="#studio" className="fade-in">Find a Studio</a></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <a href="#vehicles" className="fade-in"><img src="/img/preowned1.webp" alt="Find a Studio" /></a>
                        <h4 className="fade-in">Available Vehicles</h4>
                    </div>
                    <div className="image-box">
                        <a href="#about" className="fade-in"><img src="/img/preowned2.webp" alt="Technology" /></a>
                        <h4 className="fade-in">About Pre-Owned</h4>
                    </div>
                </div>
            </div>

            <div id="shop-menu" className={`expanded-menu-content ${activeMenu === 'shop' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        <li><a href="#apparel" className="fade-in">Apparel</a></li>
                        <li><a href="#lifestyle" className="fade-in">Lifestyle</a></li>
                        <li><a href="#charging" className="fade-in">Charging</a></li>
                        <li><a href="#accessories" className="fade-in">Vehicle Accessories</a></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <a href="#home-charger" className="fade-in"><img src="/img/ownership.webp" alt="Home Charger" /></a>
                        <h4 className="fade-in">Apex Home Charger</h4>
                    </div>
                    <div className="image-box">
                        <a href="#locations" className="fade-in"><img src="/img/lo.png" alt="Locations" /></a>
                        <h4 className="fade-in">Locations</h4>
                    </div>
                    <div className="image-box">
                        <a href="#travel" className="fade-in"><img src="/img/accessories.webp" alt="Travel Collection" /></a>
                        <h4 className="fade-in">The Travel Collection</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;