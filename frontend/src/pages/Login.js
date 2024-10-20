import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

function Login() {
  // State to toggle between login and signup forms
  const [isSignUp, setIsSignUp] = useState(false);
  // State to hold error messages
  const [errorMessage, setErrorMessage] = useState('');
  // State to manage loading state during API requests
  const [isLoading, setIsLoading] = useState(false);
  // Reference for the container to adjust height dynamically
  const containerRef = useRef(null);
  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Function to toggle between login and signup
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(''); // Clear error message when toggling
  };

  // Effect to set the height of the form container based on the visible form
  useEffect(() => {
    if (containerRef.current) {
      const height = isSignUp 
        ? containerRef.current.querySelector('.sign-up-form').offsetHeight 
        : containerRef.current.querySelector('.sign-in-form').offsetHeight;
      containerRef.current.style.height = `${height}px`; // Set height dynamically
    }
  }, [isSignUp]);

  // Handle form submission for both login and signup
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state
    setErrorMessage(''); // Clear previous error messages

    const formData = new FormData(event.target); // Create FormData from form inputs
    const data = Object.fromEntries(formData); // Convert FormData to a plain object

    try {
      let endpoint = 'http://localhost:8000/api/customer/';
      let response;

      // Handle signup logic
      if (isSignUp) {
        if (data.password !== data.confirmPassword) {
          throw new Error('Passwords do not match'); // Check if passwords match
        }
        delete data.confirmPassword; // Remove confirm password from data
        response = await axios.post(endpoint, data); // Send signup request
      } else {
        // Handle login logic
        const usersResponse = await axios.get(endpoint); // Fetch all users
        const users = usersResponse.data; // Get users data

        // Check if email and password match any user
        const user = users.find(user => user.email === data.email && user.password === data.password);

        if (user) {
          localStorage.setItem('userId', user.id.toString()); // Store user ID in local storage
          alert('Login Succesful')
          navigate('/home'); // Navigate to home page
        } else {
          throw new Error('Invalid email or password'); // Throw error if credentials are invalid
        }
      }

      // If signup is successful, store user ID and navigate to home
      if (response.data && response.data.id) {
        localStorage.setItem('userId', response.data.id.toString());
        navigate('/home');
      } else {
        throw new Error('Invalid response from server'); // Handle unexpected response
      }
    } catch (error) {
      console.error('Login/Signup error:', error);
      // Set error message from response or default message
      setErrorMessage(error.response?.data?.error || error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <div 
        ref={containerRef}
        className={`form-container ${isSignUp ? 'sign-up-mode' : ''}`} // Apply class based on form mode
      >
        <div className="form-content sign-in-form">
          <h1>Welcome Back</h1>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" required /> {/* Email input */}
            <input type="password" name="password" placeholder="Password" required /> {/* Password input */}
            <button type="submit" disabled={isLoading}> {/* Submit button */}
              {isLoading ? 'Processing...' : 'Login'}
            </button>
          </form>
          <p>Don't have an account? <a onClick={toggleForm}>Sign up</a></p> {/* Link to toggle to signup */}
        </div>
        <div className="form-content sign-up-form">
          <h1>Create Account</h1>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" required /> {/* Name input */}
            <input type="email" name="email" placeholder="Email" required /> {/* Email input */}
            <input type="password" name="password" placeholder="Password" required /> {/* Password input */}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required /> {/* Confirm password input */}
            <textarea name="address" placeholder='Address' required></textarea> {/* Address input */}
            <input type='tel' name="phone_number" placeholder='Phone Number' required /> {/* Phone number input */}
            <button type="submit" disabled={isLoading}> {/* Submit button */}
              {isLoading ? 'Processing...' : 'Sign Up'}
            </button>
          </form>
          <p>Already have an account? <a onClick={toggleForm}>Login</a></p> {/* Link to toggle to login */}
        </div>
      </div>
    </div>
  );
}

export default Login; // Export the Login component