import React, { useState, useEffect } from 'react';
import LoginSignup from "../LoginSignup/LoginSignup";
import './Homepage.css'; // Import the CSS file
import logo from '../Assets/workflow-high-resolution-logo-black-transparent_10.png'

function Homepage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="homepage-container">
       <img src={logo} className = "logo" alt = "Logo" />
      <div className ="logout-container">
      <a href="/" onClick={handleLogout} className = "homepage-link">
        Log Out
      </a>
      </div>
      <h1>Homepage</h1>
      <a href="/CurrentChats" className = "homepage-link">Current Chats</a>
      <div className="profile-section">
      <h2>Your Profile:</h2>
      <div className ="profile-info">
      <div><strong>Name:</strong> {userInfo.username}</div>
      <div><strong>Email:</strong>{userInfo.email}</div>
      <div><strong>Date of Birth:</strong> </div>
      <div><strong>Major:</strong> </div>
      </div>
      </div>
    </div>
  );
}

export default Homepage;
