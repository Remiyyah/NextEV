import React from 'react';
import './ContentSection.css';

const ContentSection = () => (
    <div className="content">
        {/* Video Background */}
        <video autoPlay muted loop className="video-background">
            <source src="ev4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="content-overlay">
            <div className="overlay-text">
                <h1>Accelerating the EV Experience</h1>
                <div className="info-box">
                    <div>
                        <p><strong>Buy from</strong></p>
                        <p>$69,900 <sup>1</sup></p>
                        <p>Air Pure</p>
                    </div>
                    <div>
                        <p><strong>Charging Allowance</strong></p>
                        <p>$1,000</p>
                        <p>on Apex charging accessories</p>
                    </div>
                    <div>
                        <p><strong>Apex Care</strong></p>
                        <p>2 yr or 24,000 mi<sup>2</sup></p>
                        <p>free scheduled maintenance</p>
                    </div>
                </div>
            </div>
            <div className="overlay-buttons">
                <button className="btn btn-outline-light">Test Drive</button>
                <button className="btn btn-outline-light">Order</button>
            </div>
        </div>
    </div>
);

export default ContentSection;