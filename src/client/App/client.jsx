/* global
  document
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App.jsx';

export default function ({ children }) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App>
          {children}
        </App>
      </BrowserRouter>,
      document.getElementById('root'),
    );
  });

  document.getElementById('jss-server-side').remove();
}
