import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
