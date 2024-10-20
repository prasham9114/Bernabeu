import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/FootwearPopup.css';  // Importing custom CSS for footwear popup styles

function FootwearPopup({ footwear, onClose }) {
  const [allFootwear, setAllFootwear] = useState([]);  // State to hold all footwear data
  const [selectedSize, setSelectedSize] = useState('');  // State to hold selected size
  const [rating, setRating] = useState(0);  // State to hold selected rating
  const [quantity, setQuantity] = useState();  // State to hold available quantity for selected size
  const sizes = [6, 7, 8, 9, 10, 11]; // Define available sizes
  const userId = localStorage.getItem('userId');  // Fetch user ID from local storage

  // useEffect hook to fetch all footwear data when the component mounts
  useEffect(() => {
    const fetchAllFootwear = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/footwear/');
        setAllFootwear(response.data);  // Set fetched footwear data in state
      } catch (error) {
        console.error('Error fetching footwear:', error);  // Log any errors
      }
    };

    fetchAllFootwear();
  }, []);  // Empty dependency array to ensure this runs only once

  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size);  // Set selected size
    // Find matching footwear by name and size
    const matchedFootwear = allFootwear.find(
      (item) => item.name === footwear.name && item.size === size
    );

    if (matchedFootwear) {
      setQuantity(matchedFootwear.quantity);  // Set quantity if footwear matches
    } else {
      setQuantity(0);  // Set quantity to 0 if no match is found
    }
  };

  // Function to handle adding footwear to the cart
  const handleAddToCart = async () => {
    if (selectedSize) {  // Check if size is selected
      try {
        const formData = new FormData();  // Create FormData object for file upload
        formData.append('customer', userId);  // Add customer ID
        formData.append('name', footwear.name);  // Add footwear name
        formData.append('size', selectedSize);  // Add selected size
        formData.append('price', footwear.price);  // Add price

        // Fetch footwear image and append to FormData
        const imageResponse = await fetch(footwear.image);
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, 'footwear_image.jpg');

        // Post the data to add to cart
        const response = await axios.post('http://localhost:8000/api/cart/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {  // Check if the request was successful
          alert(`Added ${footwear.name} footwear, size ${selectedSize} to cart`);
        } else {
          alert('Failed to add footwear to cart');  // Handle failure
        }
      } catch (error) {
        console.error('Error adding footwear to cart:', error);  // Log any errors
        alert(`Error: ${error.message}`);
      }
    } else {
      alert('Please select a size');  // Alert if no size is selected
    }
  };

  // Function to handle rating selection
  const handleRatingClick = (index) => {
    setRating(index + 1);  // Set rating based on clicked star index
  };

  return (
    <div className="footwear-popup-overlay">  {/* Popup overlay */}
      <div className="footwear-popup">  {/* Popup container */}
        <button className="close-btn" onClick={onClose}>&times;</button>  {/* Close button */}
        <div className="footwear-popup-content">  {/* Popup content */}
          <img src={footwear.image} alt={`${footwear.name} Footwear`} />  {/* Footwear image */}
          <div className="footwear-details">  {/* Footwear details */}
            <h2>{footwear.name}</h2>  {/* Footwear name */}
            <p className="footwear-description">Official {footwear.name} for the 2024 season. Comfortable and stylish.</p>  {/* Description */}
            <p className="footwear-price">₹ {footwear.price}</p>  {/* Price */}
            
            {/* Size selection buttons */}
            <div className="size-selection">
              <label>Size: </label>
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}  // Apply 'selected' class to chosen size
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            
            {/* Display quantity alerts based on stock */}
            {quantity === 0 && <p style={{color:'red'}}>Out of stock</p>}  {/* Out of stock message */}
            {quantity < 5 && quantity !== 0 && <p style={{color:'yellow'}}>Only {quantity} left!</p>}  {/* Low stock warning */}
            
            {/* Add to Cart button */}
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={quantity === 0}>Add to Cart</button>
            
            {/* Star rating system */}
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${rating > index ? 'filled' : ''}`}  // Apply 'filled' class to selected stars
                  onClick={() => handleRatingClick(index)}
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

export default FootwearPopup;
