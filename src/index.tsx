import './sass/main.scss';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './app/app';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);
