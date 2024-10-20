import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/User.css';

const User = () => {
  // State to hold user information and order history
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]); // State to hold all orders
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch customer info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get user information from the API
        const response = await axios.get(`http://localhost:8000/api/customer/${userId}/`);
        setUserInfo(response.data); // Store user info in state
      } catch (error) {
        console.error('Error fetching user info:', error); // Log any errors
      }
    };

    if (userId) {
      fetchUserInfo(); // Fetch user info if userId exists
    }
  }, [userId]);

  // Fetch all orders and filter by userId
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get all orders from the API
        const response = await axios.get('http://localhost:8000/api/order/');
        // Filter orders that belong to the current user
        const userOrders = response.data.filter(order => order.customer === Number(userId)); 
        setOrders(userOrders); // Store filtered orders in state
      } catch (error) {
        console.error('Error fetching orders:', error); // Log any errors
      }
    };

    if (userId) {
      fetchOrders(); // Fetch orders if userId exists
    }
  }, [userId]);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      // Send a DELETE request to the API
      await axios.delete(`http://localhost:8000/api/customer/${userId}/`);
      localStorage.removeItem('userId'); // Remove user ID from local storage
      alert('User Deleted Succesfully')
      navigate('/'); // Redirect to home page or login page
    } catch (error) {
      console.error('Error deleting account:', error); // Log any errors
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Remove user ID from local storage
    alert("Logout Succesful")
    navigate('/'); // Redirect to login page
  };

  // Show a loading state if userInfo is not yet available
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-page">
      <div className="user-info">
        <h2>{userInfo.name}</h2>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>
        <p><strong>Phone Number:</strong> {userInfo.phone_number}</p>
      </div>

      <div className="order-history">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Order #{order.id} - Date: {new Date(order.order_date).toLocaleDateString()} - Total: ₹{order.total_amount ? Number(order.total_amount).toFixed(2) : 'N/A'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No order history available.</p> // Message if no orders exist
        )}
      </div>

      <table className='user-table'>
        <tr>
          <th>
            <button className="button" onClick={handleDeleteAccount}>Delete Account</button>
          </th>
          <th>
            <button className="button" onClick={handleLogout}>Logout</button>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default User;