import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';

import MainApp from '../../client/components/stateless/MainApp.jsx';
import data, { nav } from '../../client/data';
import { model as Inout } from '../database/inout';
import Html from '../../client/components/stateless/Html.jsx';

function getHtml(store) {
  return Html(
    renderToString(MainApp(store)),
    JSON.stringify(store.getState()),
  );
}

export function main(req, res) {
  const store = createStore(data, {});
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
