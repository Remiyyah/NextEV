import './App.css';
import './components/Navbar';
import Navbar from './components/Navbar';
import PromoBar from './components/PromoBar';
import ContentSection from './components/ContentSection';
import FeaturedParts from './components/FeaturedParts';
import Overview from './components/Overview';
import FeatureCars from './components/FeaturedCars';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src="Octocat.png" className="App-logo" alt="logo" />
//         <p>
//           GitHub Codespaces <span className="heart">♥️</span> React
//         </p>
//         <p className="small">
//           Edit <code>src/App.jsx</code> and save to reload.
//         </p>
//         <p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </p>
//       </header>
//     </div>
//   );
// }
function App() {
  return (
    <Router>
      <div className='App'>
        {/* Components placed OUTSIDE of <Routes> will appear on every single page */}
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