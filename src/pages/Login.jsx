import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usernameOrEmail: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(formData.usernameOrEmail, formData.password);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p>Please sign in to your Read-It account</p>
        </div>
        
        {error && (
          <div className="auth-error">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="usernameOrEmail"
              required
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="Enter your username or email"
            />
          </div>
          
          <div className="form-group">
            <div className="form-group-header">
              <label>Password</label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="auth-btn"
          >
            {isLoading ? <span className="spinner"></span> : 'Sign in'}
          </button>
        </form>
        
        <p className="auth-footer">
          New to Read-It?{' '}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
