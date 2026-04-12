import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';

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

// Configure Amplify with your Cognito details (Amplify v6 syntax)
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_r4DfKXFNh', // e.g., 'us-east-1_xxxxxxxxx' - Get this from AWS!
      userPoolClientId: '3cg3etnooklgb3e25tk08rad59', // Kept from your previous code
      region: 'us-east-1',
      loginWith: {
        email: true,
      }
    }
  }
});

function App() {
  return (
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

          {/* Login Page Route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;