import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../Styles/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold items in the cart
  const [total, setTotal] = useState(0); // State for total price
  const [customer, setCustomer] = useState(null); // State to hold customer data
  const [message, setMessage] = useState(''); // State for success or error messages
  const navigate = useNavigate(); // Hook for navigation

  // Fetch cart items for a specific user
  const fetchCartItems = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cart/`, {
        params: { customerId: userId } // Pass user ID as query parameter
      });
      const items = response.data;
      setCartItems(items);
      calculateTotal(items); // Calculate total after fetching items
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  // Fetch customer data by user ID
  const fetchCustomerData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/customer/${userId}/`);
      setCustomer(response.data); // Set customer data in state
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  // Effect to fetch customer and cart items when component mounts
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    if (userId) {
      fetchCustomerData(userId); // Fetch customer data
      fetchCartItems(userId); // Fetch cart items
    }
  }, [fetchCartItems]);

  // Calculate total price of cart items
  const calculateTotal = (items) => {
    const newTotal = items.reduce((sum, item) => {
      const price = Number(item.price) || 0; // Ensure price is a number
      return sum + price; // Sum up the prices
    }, 0);
    setTotal(newTotal); // Set the total in state
  };

  // Remove an item from the cart
  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${itemId}/`); // Delete item from API
      const updatedItems = cartItems.filter(item => item.id !== itemId); // Filter out the removed item
      setCartItems(updatedItems); // Update cart items in state
      calculateTotal(updatedItems); // Recalculate total
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      if (!userId) {
        throw new Error('User ID not found in local storage'); // Throw error if user ID is not found
      }

      // Step 1: Fetch all cart items for the logged-in user
      const cartResponse = await axios.get(`http://localhost:8000/api/cart/`, {
        params: { customerId: userId },
      });
      const cartItemsForUser = cartResponse.data;

      if (cartItemsForUser.length === 0) {
        throw new Error('No items in the cart'); // Throw error if cart is empty
      }

      // Step 2: Update quantities in the respective APIs
      for (const item of cartItemsForUser) {
        const { name, size } = item;
        let itemUpdated = false;

        const models = ['kits', 'footwear', 'football', 'gloves', 'socks', 'shinguards', 'pump'];
        for (const model of models) {
          try {
            const modelResponse = await axios.get(`http://localhost:8000/api/${model}/`); // Fetch model data
            
            console.log(`${model} data:`, modelResponse.data); // Log fetched data

            const matchedItem = modelResponse.data.find(i => {
              const nameMatch = i.name.toLowerCase() === name.toLowerCase(); // Match names
              let sizeMatch = true;

              if (model === 'footwear') {
                // For footwear, convert both sizes to numbers before comparing
                sizeMatch = Number(i.size) === Number(size);
              } 
              else if(model === 'pumps'){
                sizeMatch = true; // No size matching for pumps
              }
              else if (i.size) {
                // For other items with size, compare as strings
                sizeMatch = i.size.toLowerCase() === size.toLowerCase();
              }

              return nameMatch && sizeMatch; // Return if both name and size match
            });

            if (matchedItem && matchedItem.quantity > 0) {
              await axios.patch(`http://localhost:8000/api/${model}/${matchedItem.id}/`, {
                quantity: matchedItem.quantity - 1, // Decrement quantity
              });
              itemUpdated = true; // Mark item as updated
              break;
            }
          } catch (error) {
            console.error(`Error updating ${model}:`, error); // Log any errors
          }
        }

        if (!itemUpdated) {
          throw new Error(`Failed to update quantity for item: ${name} (${size})`); // Throw error if update fails
        }
      }

      // Step 3: Delete each cart item belonging to the user
      for (const item of cartItemsForUser) {
        await axios.delete(`http://localhost:8000/api/cart/${item.id}/`); // Delete item from API
      }

      // Step 4: Create a new order
      const orderResponse = await axios.post(`http://localhost:8000/api/order/`, {
        customer: userId,
        total_amount: total,
        order_date: new Date().toISOString(), // Set order date to current date
      });

      if (orderResponse.status !== 201) {
        throw new Error('Failed to create order'); // Throw error if order creation fails
      }

      // Step 5: Clear the local cart state and redirect to home
      setCartItems([]); // Clear cart items
      setTotal(0); // Reset total
      alert('Your order has been placed successfully!'); // Notify user
      navigate('/home'); // Redirect to home
    } catch (error) {
      console.error('Error during checkout:', error); // Log errors
      alert(`Checkout failed: ${error.message}`); // Alert user of the error
    }
  };

  return (
    <div className="cart-page"> {/* Main cart container */}
      {message && <div className="success-message">{message}</div>} {/* Display success message if any */}
      <div className="cart-items"> {/* Container for cart items */}
        {cartItems.length > 0 ? (
          cartItems.map(item => ( // Map over cart items to display them
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name} ({item.size}) Price: ₹{item.price}</h3> 
              </div>
              <button onClick={() => removeItem(item.id)} className="remove-btn">
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p> // Message if cart is empty
        )}
      </div>
      <div className="cart-summary"> {/* Summary of cart items */}
        <h2>Cart Summary</h2>
        <p>Total Items: {cartItems.length}</p>
        <p>Total Price: ₹{total.toFixed(2)}</p> {/* Display total price */}
        {customer && <p>Customer: {customer.name}</p>} {/* Display customer name if available */}
        <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button> {/* Checkout button */}
      </div>
    </div>
  );
};

export default Cart; // Exporting the Cart component