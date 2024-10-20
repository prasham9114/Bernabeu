import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios for making HTTP requests
import '../Styles/KitPopup.css'; // Importing the relevant stylesheet for styling the component

function KitPopup({ kit, onClose }) {
  const [allKits, setAllKits] = useState([]); // State to hold all kit data fetched from the API
  const [selectedSize, setSelectedSize] = useState(); // State to track the currently selected size
  const [rating, setRating] = useState(0); // State to manage the user's selected rating
  const [quantity, setQuantity] = useState(); // State to manage the available quantity of the selected size
  const sizes = ['S', 'M', 'L', 'XL', 'XXL']; // Define available kit sizes
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

  // Fetch all kits from the API when the component mounts
  useEffect(() => {
    const fetchAllKits = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/kits/');
        setAllKits(response.data); // Set the kit data in state
      } catch (error) {
        console.error('Error fetching kits:', error); // Log an error if the fetch fails
      }
    };
    fetchAllKits(); // Call the function
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handle size selection when a size button is clicked
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size

    // Find the kit that matches the current kit's name and selected size
    const matchedKit = allKits.find(
      (jersey) => jersey.name === kit.name && jersey.size === size
    );

    if (matchedKit) {
      setQuantity(matchedKit.quantity); // Set the available quantity of the matched kit
    } else {
      setQuantity(0); // If no kit is found for the selected size, set quantity to 0
    }
  };

  // Handle adding the selected kit and size to the cart
  const handleAddToCart = async () => {
    if (selectedSize) {
      try {
        const formData = new FormData(); // Create a new FormData object to hold the cart data
        formData.append('customer', userId); // Add customer ID to the form data
        formData.append('name', kit.name); // Add the kit name to the form data
        formData.append('size', selectedSize); // Add the selected size to the form data
        formData.append('price', kit.price); // Add the kit price to the form data

        // Fetch the image of the kit and convert it into a blob
        const imageResponse = await fetch(kit.image);
        const imageBlob = await imageResponse.blob();
        formData.append('image', imageBlob, 'kit_image.jpg'); // Add the image blob to the form data

        console.log('Form data being sent:', formData); // Log the form data for debugging purposes

        // Send a POST request to the API to add the kit to the cart
        const response = await axios.post('http://localhost:8000/api/cart/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for form data
          },
        });

        if (response.status === 201) {
          console.log(`Added ${kit.name} kit, size ${selectedSize} to cart`); // Log success
          alert(`Added ${kit.name} kit, size ${selectedSize} to cart`); // Show success alert
        } else {
          alert('Failed to add kit to cart'); // Show failure alert if status is not 201
        }
      } catch (error) {
        console.error('Error adding kit to cart:', error); // Log error

        // Check if there is a response error from the server and log it
        if (error.response) {
          console.error('Response data:', error.response.data); // Log response data
          console.error('Response status:', error.response.status); // Log response status
          alert(`Error adding kit to cart: ${JSON.stringify(error.response.data)}`); // Alert with the error data
        } else if (error.request) {
          console.error('No response received:', error.request); // Log if no response is received
          alert('No response received from server'); // Alert if no response received
        } else {
          console.error('Error message:', error.message); // Log other errors
          alert(`Error: ${error.message}`); // Alert with error message
        }
      }
    } else {
      alert('Please select a size'); // Alert user to select a size if none is selected
    }
  };

  // Handle star rating clicks
  const handleRatingClick = (index) => {
    setRating(index + 1); // Set the rating based on the clicked star
  };

  return (
    <div className="kit-popup-overlay"> {/* Popup overlay to cover the background */}
      <div className="kit-popup"> {/* Main popup content */}
        <button className="close-btn" onClick={onClose}>&times;</button> {/* Close button */}
        <div className="kit-popup-content">
          <img src={kit.image} alt={`${kit.name} Kit`} /> {/* Display the kit image */}
          <div className="kit-details">
            <h2>{kit.name}</h2> {/* Display the kit name */}
            <p className="kit-description">
              Official {kit.name} home kit for the 2024/25 season. Made with high-quality, breathable fabric for maximum comfort on and off the pitch.
            </p>
            <p className="kit-price">₹ {kit.price}</p> {/* Display the kit price */}
            
            {/* Size selection section */}
            <div className="size-selection">
              <label>Size: </label>
              {sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`} // Apply selected class if the size is clicked
                  onClick={() => handleSizeClick(size)} // Handle size button click
                >
                  {size} {/* Display the size */}
                </button>
              ))}
            </div>
            
            {/* Display "Out of stock" message if the quantity is 0 */}
            {quantity === 0 && <p style={{color:'red'}}>Out of stock</p>}
            
            {/* Display the quantity if available and less than 5 */}
            {quantity < 5 && quantity !== 0 && <p style={{color:'yellow'}}>Only {quantity} left!</p>}
            
            {/* Add to cart button, disabled if the quantity is 0 */}
            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={quantity === 0}>Add to Cart</button>
            
            {/* Star rating section */}
            <div className="star-rating">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${rating > index ? 'filled' : ''}`} // Fill stars based on the rating
                  onClick={() => handleRatingClick(index)} // Handle star click
                >
                  &#9733; {/* Star symbol */}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitPopup; // Export the KitPopup component
