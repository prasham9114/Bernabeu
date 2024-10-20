// src/pages/Kits.js
import React, { useState, useEffect } from 'react';
import '../Styles/Kits.css';  // Importing CSS styles specific to the Kits component
import KitPopup from '../components/KitPopup'; // Importing the KitPopup component for displaying details
import bg from '../images/page-bg.jpg';  // Importing background image for the page

function Kits() {
  // State to hold the list of teams and the currently selected kit
  const [teams, setTeams] = useState([]); // Initial state for teams is an empty array
  const [selectedKit, setSelectedKit] = useState(null); // Initial state for selected kit is null

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams(); // Calling the fetch function to get team data
  }, []);

  // Function to fetch team data from the API
  const fetchTeams = async () => {
    try {
      // Fetching team data from the specified API endpoint
      const response = await fetch('http://localhost:8000/api/kits/'); 
      const data = await response.json(); // Parsing the JSON response
      
      // Filter to get only one kit per team
      const uniqueTeams = []; // Array to store unique team kits
      const seenNames = new Set(); // Set to track seen team names
      
      // Iterate through the fetched data to filter unique team kits
      data.forEach((team) => {
        // Check if the team name has already been seen
        if (!seenNames.has(team.name)) {
          uniqueTeams.push(team); // Add the team to the unique list
          seenNames.add(team.name); // Mark the name as seen
        }
      });

      setTeams(uniqueTeams);  // Update state with the filtered team kits
    } catch (error) {
      console.error('Error fetching teams:', error); // Log any errors during fetching
    }
  };

  // Function to open the popup for the selected kit
  const openKitPopup = (kit) => {
    setSelectedKit(kit); // Set the selected kit in state
  };

  // Function to close the kit popup
  const closeKitPopup = () => {
    setSelectedKit(null); // Reset selected kit to null
  };

  return (
    <div className="kits-page" style={{ backgroundImage: `url(${bg})` }}>
      {/* Displaying the grid of team kits */}
      <div className="kits-grid">
        {teams.map((team) => (
          <div key={team.id} className="kit-item">
            <img src={team.image} alt={`${team.name} Kit`} /> {/* Display team kit image */}
            <h3>{team.name}</h3> {/* Display team name */}
            <button className="view-kit-btn" onClick={() => openKitPopup(team)}>
              View Kit {/* Button to open the kit details popup */}
            </button>
          </div>
        ))}
      </div>
      {/* Render the KitPopup if a kit item is selected */}
      {selectedKit && <KitPopup kit={selectedKit} onClose={closeKitPopup} />}
    </div>
  );
}

export default Kits; // Exporting the Kits component for use in other parts of the application
