import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GardenPage } from './pages/GardenPage.tsx'

export function PageRouter() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => { setHash(window.location.hash); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return hash === '#/garden' ? <GardenPage /> : <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)
