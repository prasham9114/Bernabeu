import { useState, useEffect } from 'react';

/**
 * Custom hook to manage a loading state with a delay.
 * @param {number} delay - The delay in milliseconds before setting the loading state to false. Default is 1000ms (1 second).
 * @returns {boolean} - Returns the current loading state (true or false).
 */
const useLoader = (delay = 1000) => {
  const [loading, setLoading] = useState(true);  // Initial loading state is set to true

  useEffect(() => {
    // Set a timer to change the loading state to false after the specified delay
    const timer = setTimeout(() => {
      setLoading(false);  // Disable loading after the delay
    }, delay);

    // Clean up the timer when the component using this hook unmounts or if the delay changes
    return () => clearTimeout(timer);
  }, [delay]);  // Re-run the effect if the delay value changes

  return loading;  // Return the current loading state
};

export default useLoader;
