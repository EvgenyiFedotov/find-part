/* global
  document
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App.jsx';

export default function ({ component, props = {}, children }) {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <App>
          {React.createElement(component, props, children)}
        </App>
      </BrowserRouter>,
      document.getElementById('root'),
    );
  });

  const jssServerSide = document.getElementById('jss-server-side');

  if (jssServerSide) {
    jssServerSide.remove();
  }
}
