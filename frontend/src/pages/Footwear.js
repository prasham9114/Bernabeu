// src/pages/Footwear.js
import React, { useState, useEffect } from 'react';
import '../Styles/Footwear.css';  // Importing CSS styles specific to the Footwear component
import FootwearPopup from '../components/FootwearPopup'; // Importing the FootwearPopup component for displaying details
import bg from '../images/page-bg.jpg';  // Importing background image for the page

function Footwear() {
  // State to hold the list of footwear items and the currently selected footwear
  const [footwears, setFootwears] = useState([]); // Initial state for footwears is an empty array
  const [selectedFootwear, setSelectedFootwear] = useState(null); // Initial state for selected footwear is null

  // Fetch footwear items when the component mounts
  useEffect(() => {
    fetchFootwears(); // Calling the fetch function to get footwear data
  }, []);

  // Function to fetch footwear data from the API
  const fetchFootwears = async () => {
    try {
      // Fetching footwear data from the specified API endpoint
      const response = await fetch('http://localhost:8000/api/footwear/'); // Update the API endpoint if needed
      const data = await response.json(); // Parsing the JSON response

      // Filter to get only one footwear per name
      const uniqueFootwears = []; // Array to store unique footwear items
      const seenNames = new Set(); // Set to track seen footwear names

      // Iterate through the fetched data to filter unique footwear items
      data.forEach((footwear) => {
        // Check if the footwear name has already been seen
        if (!seenNames.has(footwear.name)) {
          uniqueFootwears.push(footwear); // Add the footwear to the unique list
          seenNames.add(footwear.name); // Mark the name as seen
        }
      });

      setFootwears(uniqueFootwears);  // Update state with the filtered footwear items
    } catch (error) {
      console.error('Error fetching footwears:', error); // Log any errors during fetching
    }
  };

  // Function to open the popup for the selected footwear
  const openFootwearPopup = (footwear) => {
    setSelectedFootwear(footwear); // Set the selected footwear in state
  };

  // Function to close the footwear popup
  const closeFootwearPopup = () => {
    setSelectedFootwear(null); // Reset selected footwear to null
  };

  return (
    <div className="footwear-page" style={{ backgroundImage: `url(${bg})` }}>
      {/* Displaying the grid of footwear items */}
      <div className="footwear-grid">
        {footwears.map((footwear) => (
          <div key={footwear.id} className="footwear-item">
            <img src={footwear.image} alt={`${footwear.name} Footwear`} /> {/* Display footwear image */}
            <h3>{footwear.name}</h3> {/* Display footwear name */}
            <button className="view-footwear-btn" onClick={() => openFootwearPopup(footwear)}>
              View Details {/* Button to open the footwear details popup */}
            </button>
          </div>
        ))}
      </div>
      {/* Render the FootwearPopup if a footwear item is selected */}
      {selectedFootwear && <FootwearPopup footwear={selectedFootwear} onClose={closeFootwearPopup} />}
    </div>
  );
}

export default Footwear; // Exporting the Footwear component for use in other parts of the application
