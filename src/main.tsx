import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// once the external font preloaded, apply the style
document.addEventListener('DOMContentLoaded', function() {
  const preloaded = document.querySelector('link[rel="preload"][href="https://fonts.cdnfonts.com/css/general-sans"]');
  if (preloaded && preloaded instanceof HTMLLinkElement) {
    preloaded.rel = 'stylesheet';
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
