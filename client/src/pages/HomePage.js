import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

const HomePage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
      </nav>

      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/video1.mp4" type="video/mp4" />
      </video>

      <div className="content">
        <div className="card-container">
          <div className="logo-box">
            {/* <img src="/assets/images/logo.png" alt="logo" /> */}
          </div>

          <div className="card-body">
            <h5 className="card-title">India's No. #1 Career Platform</h5>
            <p className="card-text">
              Search and manage your jobs with ease. Free and open-source job portal application.
            </p>
            <p>
              Not a user? Register <Link to="/register">Here!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
