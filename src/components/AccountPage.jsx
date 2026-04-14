import React from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust path if your context is in a different folder
import './AccountPage.css';

const AccountPage = () => {
    // Pull the active user object from our global Auth Context
    const { user } = useAuth();
    
    // In AWS Amplify v6, the user's email is usually stored in signInDetails.loginId
    // We provide a fallback just in case the token structure varies
    const userEmail = user?.signInDetails?.loginId || user?.username || 'jeremy@email.com';

    return (
        <div className="account-container fade-in">
            <div className="account-max-width">
                
                {/* Dashboard Header */}
                <header className="account-header">
                    <h1 className="account-title">My <span className="italic-accent">Garage</span></h1>
                    <p className="account-subtitle">Manage your Apex EV vehicles, reservations, and profile configurations.</p>
                </header>

                <div className="account-grid">
                    
                    {/* Left Column: User Profile Details */}
                    <aside className="account-sidebar">
                        <div className="account-card profile-card">
                            <h3>Profile</h3>
                            
                            <div className="profile-field">
                                <span className="field-label">NAME</span>
                                <span className="field-value">Jeremy Flagg</span>
                            </div>
                            
                            <div className="profile-field">
                                <span className="field-label">EMAIL</span>
                                <span className="field-value">{userEmail}</span>
                            </div>

                            <div className="profile-field">
                                <span className="field-label">PREFERRED STUDIO</span>
                                <span className="field-value">Memphis Delivery Center</span>
                            </div>

                            <div className="profile-field">
                                <span className="field-label">PHONE</span>
                                <span className="field-value">+1 (555) 019-8372</span>
                            </div>

                            <button className="btn-outline-gold mt-4">Edit Profile</button>
                        </div>
                    </aside>

                    {/* Right Column: Vehicles and Reservations */}
                    <main className="account-main-content">
                        <div className="account-card">
                            <h3>Current Reservations</h3>
                            
                            <div className="reservation-item">
                                <div className="reservation-image-box">
                                    {/* Replace with your actual Air/Gravity image path */}
                                    <img src="/img/air1.webp" alt="Apex Air Grand Touring" />
                                </div>
                                <div className="reservation-details">
                                    <h4>Apex Air Grand Touring</h4>
                                    <div className="status-indicator">
                                        <span className="status-dot"></span>
                                        <span className="status-text">In Production</span>
                                    </div>
                                    <p className="rn-number">RN: 8945-3021-X</p>
                                    <p className="est-delivery">Est. Delivery: Late 2026</p>
                                    <button className="btn-solid-gold">Manage Order</button>
                                </div>
                            </div>

                        </div>

                        <div className="account-card mt-4">
                            <h3>Saved Configurations</h3>
                            <div className="empty-state">
                                <p>You haven't saved any vehicle configurations yet.</p>
                                <a href="#discover" className="discover-link">Design Your Apex EV</a>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default AccountPage;