import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

export default function App({
  sheetsRegistry = null,
  sheetsManager = null,
  children,
}) {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      accent: red,
      type: 'dark',
    },
  });

  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Switch>
          {children}
        </Switch>
      </MuiThemeProvider>
    </JssProvider>
  );
}

App.propTypes = {
  children: PropTypes.object,
  sheetsRegistry: PropTypes.object,
  sheetsManager: PropTypes.object,
};
