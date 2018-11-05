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
  modules = [],
}) => ({ location = '/', ...propsServer }) => {
  const context = {};
  const sheetsRegistry = new SheetsRegistry();
  const sheetsManager = new Map();
  let modulesLoaded = [];
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

  modulesLoaded = [...modulesLoaded, ...modules].reduce((result, name) => {
    if (result.indexOf(name) === -1) {
      result.push(name);
    }

    return result;
  }, []);

  return Html({
    title: 'FindPart',
    modulesLoaded,
    content,
    css,
  });
};
