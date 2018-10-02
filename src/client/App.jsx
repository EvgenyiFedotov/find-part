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

import pages from './components/pages';

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
  const Page = pages[currentPage];
  const createPageContent = () => {
    return !!Page && !!Page.content
    && <Page.content />;
  };
  const store = Page && !!Page.reducers
    && createStore(
      Page.reducers,
      {
        ...(
          (cookies && cookies[currentPage])
            ? JSON.parse(cookies[currentPage])
            : null
        ),
        ...defStore,
      },
      applyMiddleware(...(Page.middleware || [])),
    );

  return {
    content: (
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <div className="app">
            {!!store && (
              <Provider store={store}>
                {createPageContent()}
              </Provider>
            )}

            {!store && createPageContent()}
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
