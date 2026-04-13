import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Ensure this path matches where you saved the context

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Show a sleek loading screen while waiting for AWS to confirm the token
    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', color: '#D3C1A5' }}>
                Verifying secure session...
            </div>
        );
    }

    // If not logged in, redirect them to the custom login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If they are logged in, let them through to the protected component
    return children;
};

export default ProtectedRoute;