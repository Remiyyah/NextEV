import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; // 1. Added Link import
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import './Navbar.css';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    
    const navigate = useNavigate();
    
    const dropdownRef = useRef(null);

    const closeMenu = () => setActiveMenu(null);
    const openMenu = (menu) => setActiveMenu(menu);

    useEffect(() => {
        checkUser();

        const unsubscribe = Hub.listen('auth', ({ payload }) => {
            switch (payload.event) {
                case 'signedIn':
                    setIsAuthenticated(true);
                    break;
                case 'signedOut':
                    setIsAuthenticated(false);
                    setShowAccountDropdown(false);
                    break;
                default:
                    break;
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAccountDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const checkUser = async () => {
        try {
            await getCurrentUser();
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleAccountClick = () => {
        if (isAuthenticated) {
            setShowAccountDropdown(!showAccountDropdown);
        } else {
            navigate('/login');
        }
    };

    return (
        <div 
            className={`navbar-container ${activeMenu ? 'expanded' : ''}`} 
            id="navbar"
            onMouseLeave={closeMenu}
        >
            <div className="navbar-content">
                <div className="navbar-logo" onMouseEnter={closeMenu}>
                    {/* 2. Wrap Logo in Link to go Home */}
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3>Apex EV</h3>
                        <img src="car-logo.svg" alt="Logo" />
                    </Link>
                </div>

                <ul className="navbar-nav">
                    <li>
                        <span className="nav-link expand-trigger" style={{cursor: 'pointer'}} onMouseEnter={() => openMenu('apex-air')}>
                            Apex Air
                        </span>
                    </li>
                    <li>
                        <span className="nav-link expand-trigger" style={{cursor: 'pointer'}} onMouseEnter={() => openMenu('apex-gravity')}>
                            Apex Gravity
                        </span>
                    </li>
                    <li>
                        <span className="nav-link expand-trigger" style={{cursor: 'pointer'}} onMouseEnter={() => openMenu('experience')}>
                            Pre-Owned
                        </span>
                    </li>
                    <li>
                        <span className="nav-link expand-trigger" style={{cursor: 'pointer'}} onMouseEnter={() => openMenu('shop')}>
                            Discover
                        </span>
                    </li>
                </ul>

                <div className="navbar-icons" onMouseEnter={closeMenu}>
                    <i className="bi bi-question-circle"></i>
                    <i className="bi bi-globe"></i>
                    
                    <div 
                        className="account-dropdown-container" 
                        ref={dropdownRef}
                    >
                        <i 
                            className="bi bi-person-circle dropdown-toggle"
                            onClick={handleAccountClick}
                            style={{ cursor: 'pointer', color: isAuthenticated ? '#D3C1A5' : 'inherit' }}
                            title={isAuthenticated ? "Account Menu" : "Login"}
                        ></i>

                        {isAuthenticated && showAccountDropdown && (
                            <div className="account-dropdown-menu fade-in">
                                <ul>
                                    <li onClick={() => { setShowAccountDropdown(false); navigate('/AccountPage'); }}>
                                        My Account
                                    </li>
                                    <li onClick={handleSignOut} className="sign-out-btn">
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MEGA MENUS --- */}
            
            <div id="apex-air-menu" className={`expanded-menu-content ${activeMenu === 'apex-air' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        {/* 3. Replaced <a> with <Link> and added onClick={closeMenu} */}
                        <li><Link to="/vehicle/air_pure" className="fade-in" onClick={closeMenu}>Air Pure</Link></li>
                        <li><Link to="/vehicle/air_touring" className="fade-in" onClick={closeMenu}>Air Touring</Link></li>
                        <li><Link to="/vehicle/air_gt" className="fade-in" onClick={closeMenu}>Air Grand Touring</Link></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <Link to="/vehicle/air_pure" onClick={closeMenu} className="fade-in"><img src="/img/air1.webp" alt="Apex Air" /></Link>
                        <h4 className="fade-in">Air Pure Gallery</h4>
                    </div>
                    <div className="image-box">
                        <Link to="/vehicle/air_gt" onClick={closeMenu} className="fade-in"><img src="/img/air2.webp" alt="Apex Air" /></Link>
                        <h4 className="fade-in">Air GT Gallery</h4>
                    </div>
                    {/* Kept remaining images as generic anchors until you add more pages */}
                    <div className="image-box">
                        <a href="#gallery3" className="fade-in" onClick={closeMenu}><img src="/img/air3.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery4" className="fade-in" onClick={closeMenu}><img src="/img/air4.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                    <div className="image-box">
                        <a href="#gallery5" className="fade-in" onClick={closeMenu}><img src="img/air5.webp" alt="Apex Air" /></a>
                        <h4 className="fade-in">View Gallery</h4>
                    </div>
                </div>
            </div>

            <div id="apex-gravity-menu" className={`expanded-menu-content ${activeMenu === 'apex-gravity' ? 'active' : ''}`}>
                <div className="menu-left-column">
                    <ul className="menu-list">
                        {/* 4. Link to the Gravity catalog page */}
                        <li><Link to="/vehicle/gravity" className="fade-in" onClick={closeMenu}>Discover Gravity</Link></li>
                        <li><a href="#reserve" className="fade-in" onClick={closeMenu}>Reserve Yours</a></li>
                    </ul>
                </div>
                <div className="menu-right-column">
                    <div className="image-box">
                        <Link to="/vehicle/gravity" onClick={closeMenu} className="fade-in"><img src="/img/gravity1.webp" alt="Apex Gravity" /></Link>
                        <h4 className="fade-in">Learn More</h4>
                    </div>
                    <div className="image-box">
                        <a href="#reservations" className="fade-in" onClick={closeMenu}><img src="img/gravity2.webp" alt="Reserve Gravity" /></a>
                        <h4 className="fade-in">Reservations</h4>
                    </div>
                </div>
            </div>

            {/* Experience and Shop Menus left untouched to keep scope focused */}
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