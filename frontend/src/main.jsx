import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './components/Router.jsx';
import './assets/scss/reset.scss';
import './assets/scss/header.scss';
import './assets/scss/footer.scss';
import './assets/scss/outlet.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
