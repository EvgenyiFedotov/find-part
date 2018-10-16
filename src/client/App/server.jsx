import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'react-jss/lib/jss';
import Loadable from 'react-loadable';

import Html from '../Html.jsx';
import App from './App.jsx';

export default ({
  component,
  props = {},
  children,
  modulesLoaded = [],
}) => ({ location = '/', ...propsServer }) => {
  const context = {};
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  const content = renderToString(
    <Loadable.Capture report={moduleName => modulesLoaded.push(moduleName)}>
      <StaticRouter
        location={location}
        context={context}
      >
        <App
          sheetsManager={sheetsManager}
          sheetsRegistry={sheetsRegistry}
        >
          {React.createElement(component, {
            ...props,
            ...(propsServer.props || {}),
          }, children)}
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
