/* global document */
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import { createStore } from 'redux';

// let store = document.getElementById('store').getAttribute('data-json');
// store = typeof store === 'string' ? JSON.parse(store) : {};

ReactDOM.hydrate(
  App(),
  document.getElementById('root'),
);
