import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Kits from './pages/Kits';
import About from './pages/About';
import Contact from './pages/Contact';
import Footwear from './pages/Footwear';
import Football from './pages/Footballs';
import Login from './pages/Login';
import Loader from './components/Loader';
import Accessories from './pages/Accessories';
import User from './pages/User';
import Cart from './pages/Cart';

function App() {
  const location = useLocation();  // Get current route/location using React Router
  const [loading, setLoading] = useState(false);  // State to control the display of the loader

  useEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo(0, 0);

    // Show the loader for 1 second when the route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);  // Hide the loader after the delay
    }, 1000);  // Set a 1-second delay for the loader

    // Cleanup the timer on component unmount or before running the effect again
    return () => clearTimeout(timer);
  }, [location]);  // Effect runs every time the location (route) changes

  return (
    <div className="App">
      {loading && <Loader />}  {/* Display the Loader component when loading is true */}
      <Navbar />  {/* Always display the Navbar component */}
      <Routes>
        {/* Define various routes for different pages/components */}
        <Route path="/" element={<Login />} />  {/* Default route to Login page */}
        <Route path="/home" element={<Home />} />  {/* Home page */}
        <Route path="/kits" element={<Kits />} />  {/* Kits page */}
        <Route path="/footwear" element={<Footwear />} />  {/* Footwear page */}
        <Route path="/football" element={<Football />} />  {/* Football page */}
        <Route path="/about" element={<About />} />  {/* About page */}
        <Route path="/contact" element={<Contact />} />  {/* Contact page */}
        <Route path="/accessories" element={<Accessories />} />  {/* Accessories page */}
        <Route path="/user" element={<User />} />  {/* User profile page */}
        <Route path="/cart" element={<Cart />} />  {/* Shopping cart page */}
      </Routes>
      <Footer />  {/* Always display the Footer component */}
    </div>
  );
}

export default function MainApp() {
  // Main entry point of the application wrapped with React Router
  return (
    <Router>
      <App />  {/* Render the main App component within Router context */}
    </Router>
  );
}
