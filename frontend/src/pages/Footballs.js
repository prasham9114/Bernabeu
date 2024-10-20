// src/pages/Footballs.js
import React, { useState, useEffect } from 'react';
import '../Styles/Footballs.css';  // Importing CSS styles specific to the Footballs component
import FootballPopup from '../components/FootballPopup'; // Importing the FootballPopup component for displaying details
import bg from '../images/page-bg.jpg'; // Importing background image for the page

function Footballs() {
  // State to hold the list of footballs and the currently selected football
  const [footballs, setFootballs] = useState([]); // Initial state for footballs is an empty array
  const [selectedFootball, setSelectedFootball] = useState(null); // Initial state for selected football is null

  // Fetch footballs when the component mounts
  useEffect(() => {
    fetchFootballs(); // Calling the fetch function to get football data
  }, []);

  // Function to fetch football data from the API
  const fetchFootballs = async () => {
    try {
      // Fetching football data from the specified API endpoint
      const response = await fetch('http://localhost:8000/api/football/'); // Ensure the API endpoint is correct
      const data = await response.json(); // Parsing the JSON response
      
      // Filter to get only one football per name
      const uniqueFootballs = []; // Array to store unique footballs
      const seenNames = new Set(); // Set to track seen football names
      
      // Iterate through the fetched data to filter unique footballs
      data.forEach((football) => {
        // Check if the football name has already been seen
        if (!seenNames.has(football.name)) {
          uniqueFootballs.push(football); // Add the football to the unique list
          seenNames.add(football.name); // Mark the name as seen
        }
      });

      setFootballs(uniqueFootballs);  // Update state with the filtered footballs
    } catch (error) {
      console.error('Error fetching footballs:', error); // Log any errors during fetching
    }
  };

  // Function to open the popup for the selected football
  const openFootballPopup = (football) => {
    setSelectedFootball(football); // Set the selected football in state
  };

  // Function to close the football popup
  const closeFootballPopup = () => {
    setSelectedFootball(null); // Reset selected football to null
  };

  return (
    <div className="footballs-page" style={{ backgroundImage: `url(${bg})` }}>
      {/* Displaying the grid of football items */}
      <div className="footballs-grid">
        {footballs.map((football) => (
          <div key={football.id} className="football-item">
            <img src={football.image} alt={`${football.name} Football`} /> {/* Display football image */}
            <h3>{football.name}</h3> {/* Display football name */}
            <button className="view-football-btn" onClick={() => openFootballPopup(football)}>
              View Football {/* Button to open the football details popup */}
            </button>
          </div>
        ))}
      </div>
      {/* Render the FootballPopup if a football is selected */}
      {selectedFootball && <FootballPopup football={selectedFootball} onClose={closeFootballPopup} />}
    </div>
  );
}

export default Footballs; // Exporting the Footballs component for use in other parts of the application
