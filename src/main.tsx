import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App.tsx';
import './index.css';

const posthogKey = (import.meta as any).env.VITE_POSTHOG_KEY;
const posthogHost = (import.meta as any).env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    // By default, capture pageviews
    capture_pageview: true, 
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
