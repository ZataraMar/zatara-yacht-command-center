import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setSecureHeaders } from '@/utils/csrfProtection'

// Set security headers
setSecureHeaders();

createRoot(document.getElementById("root")!).render(<App />);
