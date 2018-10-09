import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'react-jss/lib/jss';
import Loadable from 'react-loadable';

import Html from '../Html.jsx';
import App from './App.jsx';

export default function ({
  url = '/',
  children,
  modulesLoaded = [],
}) {
  const context = {};
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const content = renderToString(
    <Loadable.Capture report={moduleName => modulesLoaded.push(moduleName)}>
      <StaticRouter
        location={url}
        context={context}
      >
        <App
          sheetsManager={sheetsManager}
          sheetsRegistry={sheetsRegistry}
        >
          {children}
        </App>
      </StaticRouter>
    </Loadable.Capture>,
  );
  const css = sheetsRegistry.toString();

  return Html({
    title: 'FindPart',
    modulesLoaded,
    content,
    css,
  });
}
