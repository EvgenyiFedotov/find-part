/* global
  document, location
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import browserCookies from 'browser-cookies';

import App from './App.jsx';

// let defStore = document.getElementById('defStore').getAttribute('data-json');
// defStore = typeof defStore === 'string' ? JSON.parse(defStore) : {};

let url = location.pathname;

url = url === '/' ? '/auth' : url;

const cookiesByUrl = JSON.parse(browserCookies.get(url));

ReactDOM.hydrate(
  <BrowserRouter>
    <App cookiesByUrl={cookiesByUrl} />
  </BrowserRouter>,
  document.getElementById('root'),
);
