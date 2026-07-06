// src/main.jsx

// 01. IMPORTS
import { StrictMode } from 'react'        // React's development helper
import { createRoot } from 'react-dom/client'  // React DOM renderer
import App from './App.jsx'              // Your main App component
import './index.css'                     // Global styles (Tailwind)

// 02. FIND THE ROOT DIV & RENDER REACT
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)