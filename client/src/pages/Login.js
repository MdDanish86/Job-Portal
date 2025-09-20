import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputFrom from '../components/shared/InputFrom.js';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/features/alertSlice.js';
import Spinner from '../components/shared/Spinner.js';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.alerts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post('/api/v1/auth/login', { email, password });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem('token', data.token);
        toast.success('Login Successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Invalid Credentials please try again!');
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className='form-container' style={{ position: 'relative' }}>
          {/* Logo on top-left corner */}
          <div
            className="login-logo-container"
            style={{ position: 'absolute', top: 20, left: 20, cursor: 'pointer', zIndex: 1000 }}
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

          <form className='card p-2' onSubmit={handleSubmit}>

            {/* Removed the logo inside form */}
            {/* <img src="/assets/images/logo.png" alt="logo" height={230} width={300} /> */}

            <InputFrom
              htmlFor={"email"}
              labelText={"Email"}
              type={'email'}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name={"email"}
            />

            <InputFrom
              htmlFor={"password"}
              labelText={"Password"}
              type={'password'}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name={"password"}
            />

            <div className='d-flex justify-content-between'>
              <p>Not a user? <Link to="/register">Register here</Link></p>

              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
