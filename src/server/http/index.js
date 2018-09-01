import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Html from '../../client/components/stateless/Html.jsx';
import Appl from '../../client/components/statefull/App';

import data from '../../client/data';

// import { model as Inout } from '../database/inout';

function getHtml(defData = {}) {
  const store = createStore(data, defData);

  return renderToString(<Html content={
    <Provider store={store}>
      <Appl />
    </Provider>
  } store={store.getState()} />);
}

export function main(req, res) {
  res.send(getHtml({
    nav: {
      route: 'auth',
      params: {
        mode: 'signIn',
      },
    },
  }));
}

export default { main };
