import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AccessibilityProvider } from './context/AccessibilityContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element with id "root" not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL || '/marieke'}>
      <AccessibilityProvider>
        <App />
      </AccessibilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
