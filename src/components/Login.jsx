import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './Login.css'; // This is now a custom CSS file

const LoginPage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing'); // Phases: 'typing', 'pausing', 'backspacing', 'done'
  const [showLogin, setShowLogin] = useState(false);

  const fullText = "Welcome to Lorem Ipsum!";
  const typingSpeed = 100;
  const backspacingSpeed = 50;

  useEffect(() => {
    let timeout;

    if (phase === 'typing') {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1000);
      }
    } else if (phase === 'pausing') {
      setPhase('backspacing');
    } else if (phase === 'backspacing') {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, backspacingSpeed);
      } else {
        setPhase('done');
        setShowLogin(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, phase]);

  return (
    <div className="custom-login-container">
      {/* Typing Animation */}
      {phase !== 'done' && (
        <div className="typing-text">
          {displayedText}
        </div>
      )}

      {/* Draggable Login Box */}
      {showLogin && (
        <Draggable>
          <div className="custom-login-box custom-fade-in">
            {/* Note the specific span for the italicised "Log" */}
            <h2 className="login-heading"><span className="italic-log">Log</span> in</h2>
            
            {/* Updated text to match the image exactly */}
            <p className="sub-heading-text">
              View your orders, update your information and save configurations in your Lucid account.
            </p>
            
            <form>
              <div className="custom-input-group">
                <label htmlFor="email">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email *" 
                />
              </div>
              <div className="custom-input-group">
                <label htmlFor="password">PASSWORD</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Password *" 
                />
              </div>
              
              {/* Custom styled checkbox */}
              <div className="custom-form-check">
                <div className="checkbox-wrapper">
                  <input type="checkbox" id="stayLoggedIn" />
                  <label htmlFor="stayLoggedIn"></label>
                </div>
                <span>Keep me logged-in</span>
              </div>
              
              <button type="submit" className="custom-login-btn">
                Log in
              </button>
            </form>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default LoginPage;