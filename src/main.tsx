import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GardenPage } from './pages/GardenPage.tsx'
import { EnquiryPage } from './pages/EnquiryPage.tsx'

export function PageRouter() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => { setHash(window.location.hash); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  if (hash.split('?')[0] === '#/garden/enquiry') return <EnquiryPage key={hash} />;
  return hash === '#/garden' ? <GardenPage /> : <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageRouter />
  </StrictMode>,
)
