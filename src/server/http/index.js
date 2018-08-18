import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Html from '../../client/components/stateless/Html.jsx';
import Appl from '../../client/components/statefull/App';
import providerStore from '../../client/providerStore';

export function main(req, res) {
  const store = createStore(providerStore);

  return res.send(renderToString(<Html content={
    <Provider store={store}>
      <Appl />
    </Provider>
  } store={store.getState()}/>));
}

export default { main };
