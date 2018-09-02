import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Html from '../../client/components/stateless/Html.jsx';
import Appl from '../../client/components/statefull/App';

import data, { nav } from '../../client/data';
import { model as Inout } from '../database/inout';

function getHtml(store) {
  return renderToString(<Html content={
    <Provider store={store}>
      <Appl />
    </Provider>
  } store={store.getState()} />);
}

export function main(req, res) {
  const store = createStore(data);
  const { inout } = req.cookies;

  if (inout) {
    Inout.findById(inout, (errFind, resFind) => {
      const isOutCurrentDevice = resFind && resFind.dateOut;

      if (errFind || !resFind || isOutCurrentDevice) {
        if (isOutCurrentDevice) {
          store.dispatch(nav.actions.setParams({
            isOutCurrentDevice: true,
          }));
        }

        res.send(getHtml(store));
      } else {
        store.dispatch(nav.actions.setRoute('dashboard'));
        res.send(getHtml(store));
      }
    });
  } else {
    res.send(getHtml(store));
  }
}

export default { main };
