import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AccessoryPopup.css';

function AccessoryPopup({ accessory, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');  // State to track the selected size of the accessory
  const [rating, setRating] = useState(0);  // State to track the user-selected rating (0-5 stars)
  const [quantity, setQuantity] = useState();  // State to store the available quantity of the selected accessory size

  // Determine available sizes for the accessory, 'Air Pump' has no sizes
  const sizes = accessory.name === 'Air Pump' ? [] : ['S', 'M', 'L'];

  const userId = localStorage.getItem('userId');  // Retrieve the current user's ID from local storage

  useEffect(() => {
    // Function to fetch stock data for the selected accessory and size
    const fetchStockData = async () => {
      let apiUrl = '';  // API URL to fetch stock data based on accessory type

      // Determine the correct API endpoint based on the accessory name
      if (accessory.name.toLowerCase().includes('gloves')) {
        apiUrl = 'http://localhost:8000/api/gloves/';
      } else if (accessory.name.toLowerCase().includes('socks')) {
        apiUrl = 'http://localhost:8000/api/socks/';
      } else if (accessory.name.toLowerCase().includes('pump')) {
        apiUrl = 'http://localhost:8000/api/pump/';
      } else {
        apiUrl = 'http://localhost:8000/api/shinguards/';
      }

      try {
        // Fetch stock data for the accessory from the API
        const response = await axios.get(apiUrl);
        // Find the matching accessory by name and size from the response data
        const matchedItem = response.data.find((item) => item.name === accessory.name && item.size === selectedSize);
        setQuantity(matchedItem ? matchedItem.quantity : 0);  // Set the quantity, default to 0 if not found
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setQuantity(0);  // Set quantity to 0 if there's an error in fetching data
      }
    };

    if (selectedSize) {
      fetchStockData();  // Fetch stock data only if a size is selected
    }
  }, [selectedSize, accessory.name]);  // Run the effect when size or accessory name changes

  // Handler to update the selected size when a size button is clicked
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  // Handler to add the selected accessory to the cart
  const handleAddToCart = async () => {
    // Only proceed if either the accessory is 'Air Pump' or a size has been selected
    if (accessory.name === 'Air Pump' || selectedSize) {
      try {
        const formData = new FormData();  // Create form data to send in the request
        formData.append('customer', userId);  // Add customer ID to the form data
        formData.append('name', accessory.name);  // Add accessory name to the form data
        formData.append('size', accessory.name === 'Air Pump' ? 'GEN' : selectedSize);  // Add size or generic size for Air Pump
        formData.append('price', accessory.price);  // Add price to the form data

        // Fetch the accessory image as a blob and append it to the form data
        const imageResponse = await fetch(accessory.image);
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, 'accessory_image.jpg');  // Append the image with a default file name

        // Send a POST request to the cart API to add the accessory to the cart
        const response = await axios.post('http://localhost:8000/api/cart/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',  // Specify multipart/form-data for file upload
          },
        });

        // Handle the response based on the status code
        if (response.status === 201) {
          console.log(`Added ${accessory.name} to cart`);
          alert(`Added ${accessory.name} ${selectedSize ? `size ${selectedSize}` : ''} to cart`);  // Alert the user on successful addition
        } else {
          alert('Failed to add accessory to cart');  // Alert if the addition fails
        }
      } catch (error) {
        console.error('Error adding accessory to cart:', error);
        // Alert the user if there's an error and provide error details
        alert('Error: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
      }
    } else {
      alert('Please select a size');  // Alert the user if no size has been selected
    }
  };

  // Handler to set the rating when a star is clicked
  const handleRatingClick = (index) => {
    setRating(index + 1);  // Set rating from 1 to 5 based on the clicked star index
  };

  // Function to generate accessory description based on the accessory name
  const getDescription = (name) => {
    if (name === 'Air Pump') {
      return `AN essential for inflating footballs. Its compact design makes it easy to carry and use on the go.`;  // Custom description for Air Pump
    } else {
      return `Designed for optimal performance and durability. It provides excellent quality and reliability.`;  // General description for other accessories
    }
  };

  return (
    <div className="accessory-popup-overlay">  {/* Popup overlay for accessory details */}
      <div className="accessory-popup">
        <button className="close-btn" onClick={onClose}>&times;</button>  {/* Close button to dismiss the popup */}
        <div className="accessory-popup-content">
          <img src={accessory.image} alt={`${accessory.name} Accessory`} />  {/* Display the accessory image */}
          <div className="accessory-details">
            <h2>{accessory.name}</h2>  {/* Display the accessory name */}
            <p className="accessory-description">{getDescription(accessory.name)}</p>  {/* Display the accessory description */}
            <p className="accessory-price">₹ {accessory.price}</p>  {/* Display the accessory price */}
            {sizes.length > 0 && (  // If accessory has sizes, show size selection options
              <div className="size-selection">
                <label>Size: </label>
                {sizes.map(size => (
                  <button 
                    key={size} 
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}  // Highlight selected size
                    onClick={() => handleSizeClick(size)}  // Set selected size when a button is clicked
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            {quantity === 0 && <p style={{color:'red'}}>Out of stock</p>}  {/* Show out of stock message if quantity is 0 */}
            {quantity < 5 && quantity > 0 && <p style={{color:'yellow'}}>Only {quantity} left!</p>}  {/* Warn if limited stock is available */}
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={quantity === 0}>  {/* Disable 'Add to Cart' if out of stock */}
              Add to Cart
            </button>
            <div className="star-rating">  {/* Star rating system */}
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${rating > index ? 'filled' : ''}`}  // Fill stars up to the selected rating
                  onClick={() => handleRatingClick(index)}  // Set the rating when a star is clicked
                >
                  &#9733;  {/* Unicode character for star */}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessoryPopup;
