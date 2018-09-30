import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { SheetsRegistry } from 'react-jss/lib/jss';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import modules from './components/modules';

export default function App(props = {}) {
  const {
    page,
    defStore,
    cookies,
    isClient = false,
  } = props;

  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      accent: red,
      type: 'light',
    },
  });
  let sheetsRegistry = null;
  let sheetsManager = null;

  if (!isClient) {
    sheetsRegistry = new SheetsRegistry();
    sheetsManager = new Map();
  }

  const currentPage = page || 'Auth';
  const Module = modules[currentPage];
  const createModuleContent = () => {
    return !!Module && !!Module.content
    && <Module.content />;
  };
  const store = Module && !!Module.reducers
    && createStore(
      Module.reducers,
      {
        ...(
          (cookies && cookies[currentPage])
            ? JSON.parse(cookies[currentPage])
            : null
        ),
        ...defStore,
      },
      applyMiddleware(...(Module.middleware || [])),
    );

  return {
    content: (
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <div className="app">
            {!!store && (
              <Provider store={store}>
                {createModuleContent()}
              </Provider>
            )}

            {!store && createModuleContent()}
          </div>
        </MuiThemeProvider>
      </JssProvider>
    ),
    store,
  };
}

App.propTypes = {
  page: PropTypes.string,
  defStore: PropTypes.any,
};
