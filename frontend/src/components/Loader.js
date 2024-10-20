import React from 'react';
import '../Styles/Loader.css';  // Importing the CSS file for styling the loader
import load from '../images/loader.jpeg';  // Importing an image to display as the loader

const Loader = () => {
  return (
    <div className="loader">  {/* A div container with a 'loader' class for styling */}
      <img className="loading" src={load} alt="loading" />  {/* An image for the loading indicator */}
    </div>
  );
};

export default Loader;  // Exporting the Loader component for use in other parts of the application
