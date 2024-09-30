import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import Clothing from '../Clothing/Clothing';
import Footwear from '../Footwear/Footwear';
import Eyewear from '../Eyewear/Eyewear';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <div className="home-page">
      <header className="header">
        <h1 className="site-title">MoShop</h1>
        <nav className="nav-strip">
          <Link to="/about-site" className="nav-link">About Site</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link" onClick={handleLogout}>Log Out</Link>
              <Link to={`/cart/${username}`} className="nav-link">My Cart</Link>
              <Link to={`/invoice/${username}`} className="nav-link">My Invoices</Link>
              <Link to={`/profile/${username}`} className="nav-link">My Profile</Link>
            </>
          )}
        </nav>
      </header>
      <main className="product-section">
        <Clothing />
        <Footwear />
        <Eyewear />
      </main>
    </div>
  );
}

export default HomePage;