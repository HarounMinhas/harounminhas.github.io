import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Default preferences for accessibility features
const defaultPreferences = {
  dyslexicFont: false,
  grayscale: false,
  highContrast: false
};

const STORAGE_KEY = 'accessibility-preferences';

const AccessibilityContext = createContext({
  preferences: defaultPreferences,
  togglePreference: () => {},
  resetPreferences: () => {}
});

/**
 * Provides accessibility preferences to the application via React Context.
 * Manages localStorage persistence and DOM class application for accessibility features.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to accessibility context
 */
export const AccessibilityProvider = ({ children }) => {
  // Initialize state from localStorage if available, fallback to defaults
  const [preferences, setPreferences] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultPreferences;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
    } catch (error) {
      console.warn('Kon toegankelijkheidsinstellingen niet lezen:', error);
      return defaultPreferences;
    }
  });

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.warn('Kon toegankelijkheidsinstellingen niet opslaan:', error);
    }
  }, [preferences]);

  // Apply or remove accessibility CSS classes on document root based on active preferences
  useEffect(() => {
    const root = document.documentElement;
    const classMap = {
      dyslexicFont: 'accessibility-dyslexic',
      grayscale: 'accessibility-grayscale',
      highContrast: 'accessibility-high-contrast'
    };

    Object.entries(classMap).forEach(([key, className]) => {
      if (preferences[key]) {
        root.classList.add(className);
      } else {
        root.classList.remove(className);
      }
    });

    // Lazy load Lexend font only when dyslexic mode is activated
    if (preferences.dyslexicFont) {
      const linkId = 'lexend-font';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
      }
    }
  }, [preferences]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      preferences,
      // Toggle a specific preference on/off
      togglePreference: (key) =>
        setPreferences((prev) => ({
          ...prev,
          [key]: !prev[key]
        })),
      // Reset all preferences to default values
      resetPreferences: () => setPreferences(defaultPreferences)
    }),
    [preferences]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

/**
 * Hook to access accessibility preferences and controls.
 * Must be used within an AccessibilityProvider.
 * 
 * @returns {Object} Context value containing preferences and control functions
 */
export const useAccessibility = () => useContext(AccessibilityContext);
