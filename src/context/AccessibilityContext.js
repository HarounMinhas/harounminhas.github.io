import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

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

export const AccessibilityProvider = ({ children }) => {
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

    // Lazy load Lexend font when dyslexic mode is enabled
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

  const value = useMemo(
    () => ({
      preferences,
      togglePreference: (key) =>
        setPreferences((prev) => ({
          ...prev,
          [key]: !prev[key]
        })),
      resetPreferences: () => setPreferences(defaultPreferences)
    }),
    [preferences]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = () => useContext(AccessibilityContext);
