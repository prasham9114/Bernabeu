import React, { useState, useEffect } from 'react';
import '../Styles/Accessories.css';  // Ensure the CSS file matches the component
import AccessoryPopup from '../components/AccessoryPopup'; // Adjust this if necessary
import bg from '../images/page-bg.jpg';

function Accessories() {
  const [accessories, setAccessories] = useState([]); // State to hold accessories
  const [selectedAccessory, setSelectedAccessory] = useState(null); // State for the selected accessory

  useEffect(() => {
    fetchAccessories(); // Fetch accessories on component mount
  }, []);

  const fetchAccessories = async () => {
    try {
      const responses = await Promise.all([ // Fetch data from multiple endpoints
        fetch('http://localhost:8000/api/shinguards/'),
        fetch('http://localhost:8000/api/socks/'),
        fetch('http://localhost:8000/api/gloves/'),
        fetch('http://localhost:8000/api/pump/')
      ]);

      const [shinguards, socks, gloves, pumps] = await Promise.all(responses.map(res => res.json())); // Parse JSON responses

      // Combine all accessories into one array
      const allAccessories = [...shinguards, ...socks, ...gloves, ...pumps];

      // Filter to get only one accessory per name
      const uniqueAccessories = [];
      const seenNames = new Set(); // Set to track seen accessory names

      allAccessories.forEach((accessory) => {
        if (!seenNames.has(accessory.name)) {
          uniqueAccessories.push(accessory); // Add unique accessory to the list
          seenNames.add(accessory.name); // Mark name as seen
        }
      });

      setAccessories(uniqueAccessories);  // Set filtered accessories in state
    } catch (error) {
      console.error('Error fetching accessories:', error); // Log any errors
    }
  };

  const openAccessoryPopup = (accessory) => {
    setSelectedAccessory(accessory); // Set selected accessory for the popup
  };

  const closeAccessoryPopup = () => {
    setSelectedAccessory(null); // Clear selected accessory to close popup
  };

  return (
    <div className="accessories-page" style={{ backgroundImage: `url(${bg})` }}> {/* Background image for the page */}
      <div className="accessories-grid"> {/* Grid layout for accessories */}
        {accessories.map((accessory) => ( // Map over accessories to create items
          <div key={accessory.id} className="accessory-item">
            <img src={accessory.image} alt={`${accessory.name} Accessory`} />
            <h3>{accessory.name}</h3>
            <button className="view-accessory-btn" onClick={() => openAccessoryPopup(accessory)}> {/* Button to view accessory */}
              View Accessory
            </button>
          </div>
        ))}
      </div>
      {selectedAccessory && <AccessoryPopup accessory={selectedAccessory} onClose={closeAccessoryPopup} />} {/* Popup for selected accessory */}
    </div>
  );
}

export default Accessories; // Exporting the Accessories component
