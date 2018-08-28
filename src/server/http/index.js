import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Html from '../../client/components/stateless/Html.jsx';
import Appl from '../../client/components/statefull/App';

import providerStore from '../../client/providerStore';

// import { model as Inout } from '../database/inout';

function getHtml(defStore = {}) {
  const store = createStore(providerStore, defStore);

  return renderToString(<Html content={
    <Provider store={store}>
      <Appl />
    </Provider>
  } store={store.getState()} />);
}

export function main(req, res) {
  res.send(getHtml());
}

export default { main };
