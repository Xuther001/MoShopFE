import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Clothing from '../Clothing/Clothing';
import Footwear from '../Footwear/Footwear';
import './HomePage.css';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
    if (isMobile) {
      window.location.href = 'http://moshopfemobile.s3-website-us-west-2.amazonaws.com/';
      return;
    }

    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCartClick = () => {
    if (username) {
      navigate(`/cart/${username}`);
    }
  };

  const handleInvoiceClick = () => {
    if (username) {
      navigate(`/invoice/${username}`);
    }
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/profile/${username}`);
    }
  };

  return (
    <div className="home-page">
      <div className="auth-buttons">
        <Link to="/about-site" className="button">About Site</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="button">Login</Link>
            <Link to="/register" className="button">Sign Up</Link>
          </>
        ) : (
          <>
            <button className="button" onClick={handleLogout}>Log Out</button>
            <button className="button" onClick={handleCartClick}>My Cart</button>
            <button className="button" onClick={handleInvoiceClick}>My Invoices</button>
            <button className="button" onClick={handleProfileClick}>My Profile</button>
          </>
        )}
      </div>
      <Clothing className="clothing-component" />
      <Footwear />
    </div>
  );
}

export default HomePage;