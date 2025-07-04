import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import  {Profilecontextprovider } from './componenets/context';

createRoot(document.getElementById('root')).render(
  <Profilecontextprovider>
  <StrictMode>
    <App />
  </StrictMode>
  </Profilecontextprovider>
)
