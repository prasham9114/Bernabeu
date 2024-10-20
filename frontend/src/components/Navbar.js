import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Link, useLocation } from 'react-router-dom'; // Importing Link and useLocation for routing
import '../Styles/Navbar.css'; // Importing CSS for styling the navbar
import logo from '../images/brand-logo.jpg'; // Importing the brand logo image

function Navbar() {
  const [navbarTransform, setNavbarTransform] = useState('translateY(0)');
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [alpha, setAlpha] = useState(0.5);
  const [isToggled, setIsToggled] = useState(false);

  const location = useLocation(); // Getting the current route location

  useEffect(() => {
    const handleScroll = () => {
      setAlpha(window.scrollY === 0 ? 1 : 0.5);
      if (window.scrollY > lastScrollY) {
        setNavbarTransform('translateY(-100%)');
      } else {
        setNavbarTransform('translateY(0)');
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const closeMenu = () => {
    setIsToggled(false); // Closes the mobile menu
  };

  const isActive = (path) => location.pathname === path;
  const isLoginPage = location.pathname === '/';

  return (
    <nav className="navbar" style={{ transform: navbarTransform, backgroundColor: `rgba(30, 30, 30, ${alpha})` }}>
      <img className='logo' src={logo} alt='logo' />
      <div className="navbar-logo">
        <Link to="/home" className={isActive('/home') ? 'active' : ''}>The Bernabeu</Link>
      </div>
      <div className="navbar-toggle" onClick={handleToggle}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navbar-links ${isToggled ? 'active' : ''}`}>
        <li>
          <Link 
            to="/home" 
            className={isActive('/home') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/kits" 
            className={isActive('/kits') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            Kits
          </Link>
        </li>
        <li>
          <Link 
            to="/footwear" 
            className={isActive('/footwear') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            Footwear
          </Link>
        </li>
        <li>
          <Link 
            to="/accessories" 
            className={isActive('/accessories') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            Accessories
          </Link>
        </li>
        <li>
          <Link 
            to="/football" 
            className={isActive('/football') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            Footballs
          </Link>
        </li>
        <li>
          <Link 
            to="/cart" 
            className={isActive('/cart') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </li>
        <li>
          <Link 
            to="/user" 
            className={isActive('/user') ? 'active' : ''} 
            onClick={() => { closeMenu(); }} // Close menu when link is clicked
            style={{ pointerEvents: isLoginPage ? 'none' : 'auto', opacity: isLoginPage ? 0.5 : 1 }}
          >
            <i className="fas fa-user"></i>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; // Exporting the Navbar componen