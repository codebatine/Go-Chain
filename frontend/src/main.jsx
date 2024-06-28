import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './components/Router.jsx';
import './assets/scss/styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

