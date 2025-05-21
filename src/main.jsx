import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Favbook from './Favbook.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Favbook/>
  </StrictMode>,
)
