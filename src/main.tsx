import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SessionProvider } from './hooks/useSession';
import { SupabaseProvider } from './hooks/useSupabase';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupabaseProvider>
      <SessionProvider>
        <Router>
          <App />
        </Router>
      </SessionProvider>
    </SupabaseProvider>
  </StrictMode>,
)
