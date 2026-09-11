import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';

window.onerror = function(message, source, lineno, colno, error) {
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Global Error</h1><pre>${message}</pre><pre>${error?.stack}</pre></div>`;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
