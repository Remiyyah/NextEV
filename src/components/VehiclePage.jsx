import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VehiclePage.css'; 

const VehiclePage = () => {
    const { vehicleId } = useParams(); 
    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`https://0h5hf1wl7i.execute-api.us-east-1.amazonaws.com/vehicles/${vehicleId.toUpperCase()}`);
                
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicle data.");
                }
                
                const data = await response.json();
                setVehicleData(data);
            } catch (err) {
                console.error("Error fetching vehicle:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [vehicleId]); 

    // 1. Loading State
    if (loading) {
        return (
            <div className="vehicle-page-wrapper">
                <div className="vehicle-state-container">
                    <h2>Loading Apex {vehicleId.replace('_', ' ')}...</h2>
                </div>
            </div>
        );
    }

    // 2. Error State
    if (error) {
        return (
            <div className="vehicle-page-wrapper">
                <div className="vehicle-state-container vehicle-error">
                    <h2>Oops! Something went wrong.</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // 3. Success State
    return (
        <div className="vehicle-page-wrapper">
            <div className="vehicle-page-content fade-in">
                <div className="vehicle-header">
                    <h1 className="vehicle-title">{vehicleData.name}</h1>
                    <p className="vehicle-description">
                        {vehicleData.description}
                    </p>
                </div>

                <div className="vehicle-image-container">
                    <img 
                        src={vehicleData.imageUrl} 
                        alt={vehicleData.name} 
                        className="vehicle-image"
                    />
                </div>

                <div className="vehicle-specs-grid">
                    <div className="spec-item">
                        <h3 className="spec-value">{vehicleData.rangeMiles} <span className="spec-unit">mi</span></h3>
                        <p className="spec-label">EPA Est. Range</p>
                    </div>
                    <div className="spec-item">
                        <h3 className="spec-value">{vehicleData.zeroToSixty} <span className="spec-unit">s</span></h3>
                        <p className="spec-label">0-60 mph</p>
                    </div>
                    <div className="spec-item">
                        <h3 className="spec-value">{vehicleData.horsepower} <span className="spec-unit">hp</span></h3>
                        <p className="spec-label">Peak Power</p>
                    </div>
                    <div className="spec-item">
                        <h3 className="spec-value"><span className="spec-unit">$</span>{vehicleData.basePrice.toLocaleString()}</h3>
                        <p className="spec-label">Starting Price</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehiclePage;