import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setSecureHeaders } from '@/utils/csrfProtection'
import { getEnvironmentConfig } from '@/utils/productionConfig'

// Set security headers
setSecureHeaders();

// Register service worker for production
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize environment configuration
const config = getEnvironmentConfig();
console.log(`Zatara Command Center - ${config.environment} environment`);

createRoot(document.getElementById("root")!).render(<App />);
