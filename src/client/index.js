/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// let defStore = document.getElementById('defStore').getAttribute('data-json');
// defStore = typeof defStore === 'string' ? JSON.parse(defStore) : {};

ReactDOM.hydrate(
  <App />,
  document.getElementById('root'),
);
