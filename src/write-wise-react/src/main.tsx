import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/tailwind.css';
import { EthereumProvider } from './contexts/EthereumContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EthereumProvider>
      <App />
    </EthereumProvider>
  </StrictMode>,
)
