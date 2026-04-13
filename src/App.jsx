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

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_r4DfKXFNh', 
      userPoolClientId: '3cg3etnooklgb3e25tk08rad59', 
      region: 'us-east-1',
      loginWith: {
        email: true,
      }
    }
  }
});

// A temporary dummy component so you can test the route right now
const DummyAccountPage = () => (
    <div style={{ paddingTop: '100px', height: '100vh', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ color: '#D3C1A5' }}>Account Dashboard</h1>
        <p>If you can see this, the Protected Route and Context are working perfectly!</p>
    </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
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

            {/* Public Login Route */}
            <Route path="/login" element={<Login />} />

            {/* The Locked Account Route */}
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <DummyAccountPage />
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