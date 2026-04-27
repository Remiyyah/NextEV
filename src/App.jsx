import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

// Authentication Architecture
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// UI Components
import './App.css';
import Navbar from './components/Navbar';
import PromoBar from './components/PromoBar';
import ContentSection from './components/ContentSection';
import FeaturedParts from './components/FeaturedParts';
import Overview from './components/Overview';
import FeatureCars from './components/FeaturedCars';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import AccountPage from './components/AccountPage';

// NEW: Import the VehiclePage component
import VehiclePage from './components/VehiclePage';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_r4DfKXFNh',
      userPoolClientId: '3cg3etnooklgb3e25tk08rad59',
      region: 'us-east-1',
      loginWith: {
        email: true
      }
    }
  }
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <PromoBar />
          <Navbar />

          <Routes>
            {/* Main Home Page Route */}
            <Route
              path="/"
              element={
                <>
                  <ContentSection />
                  <Header />
                  <FeaturedParts />
                  <Overview />
                  <FeatureCars />
                  <Footer />
                </>
              }
            />

            {/* NEW: Dynamic Vehicle Catalog Route */}
            {/* The :vehicleId parameter will capture 'air_pure', 'air_gt', etc. */}
            <Route path="/vehicle/:vehicleId" element={<VehiclePage />} />

            {/* Public Login Route */}
            <Route path="/login" element={<Login />} />

            {/* The Locked Account Route */}
            <Route
              path="/AccountPage"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;