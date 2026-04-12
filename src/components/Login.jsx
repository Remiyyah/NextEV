import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { signIn, confirmSignIn } from 'aws-amplify/auth'; // Added confirmSignIn
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  // Animation state
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing');
  const [showLogin, setShowLogin] = useState(false);

  // Form & Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState(''); // State for the new password challenge
  const [needsNewPassword, setNeedsNewPassword] = useState(false); // Tracks if we are in the challenge phase
  const [authError, setAuthError] = useState('');
  
  const navigate = useNavigate();
  const nodeRef = useRef(null); // Ref to fix the Draggable StrictMode warning

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

  // Handle the Amplify Sign In and Challenges
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError(''); 

    try {
      if (needsNewPassword) {
        // --- STEP 2: Handle the "Force Change Password" submission ---
        const { isSignedIn } = await confirmSignIn({ 
            challengeResponse: newPassword 
        });
        
        if (isSignedIn) {
          console.log("Password updated and login successful!");
          navigate('/'); 
        }
      } else {
        // --- STEP 1: Standard Login ---
        const { isSignedIn, nextStep } = await signIn({ 
          username: email, 
          password 
        });

        if (isSignedIn) {
          console.log("Login successful!");
          navigate('/'); 
        } else if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          // Cognito caught the temporary password and is demanding a new one
          setNeedsNewPassword(true);
          setAuthError('Temporary password accepted. Please create a permanent password.');
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAuthError(error.message || "Invalid email or password.");
    }
  };

  return (
    <div className="custom-login-container">
      {phase !== 'done' && (
        <div className="typing-text">
          {displayedText}
        </div>
      )}

      {showLogin && (
        <Draggable nodeRef={nodeRef}>
          <div ref={nodeRef} className="custom-login-box custom-fade-in">
            <h2 className="login-heading"><span className="italic-log">Log</span> in</h2>
            
            <p className="sub-heading-text">
              View your orders, update your information and save configurations in your Lucid account.
            </p>
            
            <form onSubmit={handleLoginSubmit}>
              
              {/* If we NEED a new password, hide the old inputs and show the New Password input */}
              {needsNewPassword ? (
                <div className="custom-input-group">
                  <label htmlFor="newPassword">NEW PERMANENT PASSWORD</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    placeholder="Enter new password *" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              ) : (
                /* Standard Login Inputs */
                <>
                  <div className="custom-input-group">
                    <label htmlFor="email">EMAIL</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Email *" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="custom-input-group">
                    <label htmlFor="password">PASSWORD (TEMPORARY)</label>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder="Password *" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Error / Information Messaging */}
              {authError && (
                <div style={{ color: needsNewPassword ? '#D3C1A5' : '#ff6b6b', fontSize: '13px', marginBottom: '15px' }}>
                  {authError}
                </div>
              )}
              
              {/* Only show the 'keep me logged in' checkbox on the initial login screen */}
              {!needsNewPassword && (
                <div className="custom-form-check">
                  <div className="checkbox-wrapper">
                    <input type="checkbox" id="stayLoggedIn" />
                    <label htmlFor="stayLoggedIn"></label>
                  </div>
                  <span>Keep me logged-in</span>
                </div>
              )}
              
              <button type="submit" className="custom-login-btn">
                {needsNewPassword ? 'Update Password & Log in' : 'Log in'}
              </button>
            </form>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default LoginPage;