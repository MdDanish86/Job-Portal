// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/assets/images/logo.png" alt="logo" />
      </Link>
      {/* You can add more nav links here if needed */}
    </nav>
  );
};

export default Navbar;
