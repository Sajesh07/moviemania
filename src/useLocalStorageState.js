import { useState, useEffect } from "react";

export function useLocalStorageState(key, defaultValue) {
  // Helper function to safely get data from localStorage
  function getStoredValue() {
    try {
      const storedItem = window.localStorage.getItem(key);

      // If nothing is stored, return the default value
      if (storedItem === null) {
        return defaultValue;
      }

      // Parse the stored JSON data
      const parsedValue = JSON.parse(storedItem);
      return parsedValue;
    } catch (error) {
      // If there's an error (corrupted data, localStorage disabled, etc.)
      console.warn(`Could not read "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  // Initialize state with value from localStorage
  const [value, setValue] = useState(getStoredValue);

  // Save to localStorage whenever the value changes
  useEffect(() => {
    // Helper function to safely save data to localStorage
    function saveToStorage(newValue) {
      try {
        if (newValue === undefined || newValue === null) {
          // Remove the key if value is undefined/null
          window.localStorage.removeItem(key);
        } else {
          // Convert to JSON string and save
          const jsonString = JSON.stringify(newValue);
          window.localStorage.setItem(key, jsonString);
        }
      } catch (error) {
        console.warn(`Could not save "${key}" to localStorage:`, error);
      }
    }

    saveToStorage(value);
  }, [key, value]);

  // Return the state and setter function (same as useState)
  return [value, setValue];
}
