import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { WindowManagerProvider } from './state/WindowManagerContext';
import './styles/global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element was not found.');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <WindowManagerProvider>
        <App />
      </WindowManagerProvider>
    </BrowserRouter>
  </StrictMode>,
);
