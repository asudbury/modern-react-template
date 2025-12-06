/**
 * Application Entry Point
 *
 * This file initializes the React application with StrictMode enabled.
 * StrictMode helps identify potential problems in the application by:
 * - Detecting unsafe lifecycle methods
 * - Warning about legacy string ref API usage
 * - Warning about deprecated findDOMNode usage
 * - Detecting unexpected side effects
 *
 * The root element is mounted to the DOM element with id "root" from index.html.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
