import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/FootballPopup.css';

function FootballPopup({ football, onClose }) {
  // Define state variables
  const [allFootballs, setAllFootballs] = useState([]); // Store all football data fetched from API
  const [selectedSize, setSelectedSize] = useState(''); // Store selected football size
  const [rating, setRating] = useState(0); // Store user rating (out of 5 stars)
  const [quantity, setQuantity] = useState(); // Store the available quantity of selected football size
  const sizes = ['3', '4', '5']; // Define available football sizes
  const userId = localStorage.getItem('userId'); // Get user ID from localStorage

  // useEffect hook to fetch all football data when component loads
  useEffect(() => {
    const fetchAllFootballs = async () => {
      try {
        // Fetch football data from API
        const response = await axios.get('http://localhost:8000/api/football/');
        setAllFootballs(response.data); // Store the fetched football data in state
      } catch (error) {
        console.error('Error fetching footballs:', error); // Log error if fetching fails
      }
    };

    fetchAllFootballs();
  }, []); // Empty dependency array to run only on mount

  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size
    const matchedFootball = allFootballs.find(
      (item) => item.name === football.name && item.size === size // Find the matching football based on name and size
    );

    if (matchedFootball) {
      setQuantity(matchedFootball.quantity); // Set quantity of the selected size if found
    } else {
      setQuantity(0); // If no matching size, set quantity to 0
    }
  };

  // Function to handle adding football to the cart
  const handleAddToCart = async () => {
    if (selectedSize) { // Ensure size is selected
      try {
        const formData = new FormData(); // Create FormData for the POST request
        formData.append('customer', userId); // Add user ID to the form data
        formData.append('name', football.name); // Add football name to form data
        formData.append('size', selectedSize); // Add selected size to form data
        formData.append('price', football.price); // Add football price to form data

        // Fetch the image from the football object and add it as a blob
        const imageResponse = await fetch(football.image);
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, 'football_image.jpg'); // Append the image to form data

        // Send POST request to add the football to the cart
        const response = await axios.post('http://localhost:8000/api/cart/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure multipart form-data header
          },
        });

        if (response.status === 201) {
          alert(`Added ${football.name} football, size ${selectedSize} to cart`); // Success message
        } else {
          alert('Failed to add football to cart'); // Failure message
        }
      } catch (error) {
        console.error('Error adding football to cart:', error); // Log error if adding to cart fails
        alert(`Error: ${error.message}`); // Alert user of error
      }
    } else {
      alert('Please select a size'); // Alert user to select a size if none selected
    }
  };

  // Function to handle rating click
  const handleRatingClick = (index) => {
    setRating(index + 1); // Set rating based on the clicked star
  };

  return (
    <div className="football-popup-overlay">
      <div className="football-popup">
        <button className="close-btn" onClick={onClose}>&times;</button> {/* Close button */}
        <div className="football-popup-content">
          <img src={football.image} alt={`${football.name} Football`} /> {/* Football image */}
          <div className="football-details">
            <h2>{football.name}</h2> {/* Football name */}
            <p className="football-description">Official {football.name} football for the 2024 season.</p> {/* Description */}
            <p className="football-price">₹ {football.price}</p> {/* Football price */}
            
            {/* Size selection */}
            <div className="size-selection">
              <label>Size: </label>
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`} // Highlight selected size
                  onClick={() => handleSizeClick(size)} // Handle size click
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Stock status messages based on quantity */}
            {quantity === 0 && <p style={{color:'red'}}>Out of stock</p>}
            {quantity < 5 && quantity !== 0 && <p style={{color:'yellow'}}>Only {quantity} left!</p>}

            {/* Add to cart button, disabled if quantity is 0 */}
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={quantity === 0}>Add to Cart</button>

            {/* Star rating system */}
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${rating > index ? 'filled' : ''}`} // Filled stars based on rating
                  onClick={() => handleRatingClick(index)} // Handle rating click
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FootballPopup;
