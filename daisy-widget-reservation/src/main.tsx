import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const devContainer = document.getElementById("dev-root");

if (devContainer) {
    const root = createRoot(devContainer);
    root.render(
        <StrictMode>
            <App/>
        </StrictMode>,
    );
}