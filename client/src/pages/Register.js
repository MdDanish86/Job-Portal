import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputFrom from '../components/shared/InputFrom.js';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import axios from 'axios';
import Spinner from '../components/shared/Spinner';
import { toast } from 'react-toastify';
import '../styles/Register.css';

const Register = () => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = useSelector(state => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !email || !password) {
      return toast('Please Provide All Fields');
    }

    if (password.length < 6) {
      return toast('Password must be at least 6 characters long');
    }

    try {
      dispatch(showLoading());

      const { data } = await axios.post('/api/v1/auth/register', {
        name,
        lastName,
        email,
        password,
      });

      dispatch(hideLoading());

      if (data.success) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }

    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      alert('Invalid Form Details. Please try again!');
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='form-container'>
          
          {/* Logo on top-left corner, clickable */}
          <div 
            className="register-logo-container"
            style={{ position: 'absolute', top: 20, left: 20, cursor: 'pointer' }}
            onClick={() => navigate('/')}
            aria-label="Go to homepage"
          >
            <img 
              src="/assets/images/logo.png" 
              alt="logo" 
              height={60} 
              style={{ objectFit: 'contain' }} 
            />
          </div>

          <form className='register-card' onSubmit={handleSubmit}>

            {/* Form inputs */}
            <InputFrom
              htmlFor="name"
              labelText="Name"
              type="text"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name="name"
            />

            <InputFrom
              htmlFor="lastName"
              labelText="Last Name"
              type="text"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
              name="lastname"
            />

            <InputFrom
              htmlFor="email"
              labelText="Email"
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />

            <InputFrom
              htmlFor="password"
              labelText="Password"
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="password"
            />

            <div className='d-flex justify-content-between'>
              <p>Already Registered? <Link to="/login">Login</Link></p>
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
