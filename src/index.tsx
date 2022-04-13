import React from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

