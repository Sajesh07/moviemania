import { useEffect, useCallback } from "react";

export function useKey(key, callback) {
  // Create a stable callback reference
  const callbackRef = useCallback(callback, [callback]);

  useEffect(() => {
    function handleKeyDown(event) {
      // Check if the pressed key matches our target key
      if (event.key.toLowerCase() === key.toLowerCase()) {
        // Prevent default behavior for certain keys
        if (key.toLowerCase() === "enter") {
          event.preventDefault();
        }

        // Call the provided callback function
        callbackRef(event);
      }
    }

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, callbackRef]);
}

