import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If you have a custom theme, it's already wrapped in App.js as per your earlier code.
// If not, you can wrap here as well, but your App.js already does it.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);