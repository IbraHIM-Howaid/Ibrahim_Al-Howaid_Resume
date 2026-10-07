import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './perf.js'; // sets <html data-perf> before first paint
import './style.css';
import App from './App.jsx';
import { startAnalytics } from './analytics.js';

startAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
