import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppointmentProvider } from './context/AppointmentContext';
import { ToastProvider } from './context/ToastContext';
import { ErrorBoundary } from './components/ErrorBoundary';

console.log('Main.tsx is running');
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element not found');

  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <AppointmentProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AppointmentProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
  console.log('React render called');
} catch (e) {
  console.error('Render error:', e);
}
