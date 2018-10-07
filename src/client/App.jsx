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
import { Route, Switch } from 'react-router-dom';

import pages from './components/pages';

const { Auth } = pages;

export default function App({
  isClient = false,
  cookiesByUrl = null,
}) {
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

  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Switch>
          <Route render={() => (
            <Auth cookiesByUrl={cookiesByUrl} />
          )}/>
        </Switch>
      </MuiThemeProvider>
    </JssProvider>
  );
}

App.propTypes = {
  isClient: PropTypes.bool,
  cookiesByUrl: PropTypes.object,
};
