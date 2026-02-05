<<<<<<< HEAD
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
>>>>>>> c87d5b6a13c8cb15e06da38b94ad60140ea6536d
