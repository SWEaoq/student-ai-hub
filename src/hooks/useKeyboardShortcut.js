import { useEffect } from 'react';

/**
 * useKeyboardShortcut - Custom hook for keyboard shortcuts
 * @param {string} key - Key to listen for (e.g., 'Escape', '/', 'k')
 * @param {Function} callback - Callback function when key is pressed
 * @param {Array} dependencies - Dependencies array (optional)
 */
export const useKeyboardShortcut = (key, callback, dependencies = []) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check for modifier keys
      const isModifierPressed = event.ctrlKey || event.metaKey || event.altKey;
      
      // Handle Escape key
      if (key === 'Escape' && event.key === 'Escape') {
        event.preventDefault();
        callback(event);
        return;
      }
      
      // Handle other keys (only if no modifier is pressed, unless specified)
      if (event.key === key && !isModifierPressed) {
        // Prevent default only for special keys like '/'
        if (key === '/') {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [key, callback, ...dependencies]);
};

