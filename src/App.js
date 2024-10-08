import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Register from './components/UserRegistration/Register';
import Login from './components/Login/Login';
import MyCart from './components/MyCart/MyCart';
import MyInvoice from './components/MyInvoice/MyInvoice';
import MyProfile from './components/MyProfile/MyProfile';
import PasswordChangeRequest from './components/PasswordChangeRequest/PasswordChangeRequest';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AboutSite from './components/AboutSite/AboutSite';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(window.navigator.userAgent);
    
    if (isMobile) {
      // Redirect to mobile site
      window.location.href = 'http://moshopfemobile.s3-website-us-west-2.amazonaws.com/';
    } else {
      setLoading(false); // Set loading to false if not mobile
    }
  }, []);

  // Show a loading message while checking for mobile
  if (loading) {
    return <div>Loading...</div>; // Without this, users will still see some contents before being redirected
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invoice/:username" element={<MyInvoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart/:username" element={<MyCart />} />
        <Route path="/profile/:username" element={<MyProfile />} />
        <Route path="/passwordchangerequest" element={<PasswordChangeRequest />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about-site" element={<AboutSite />} />
      </Routes>
    </Router>
  );
}

export default App;