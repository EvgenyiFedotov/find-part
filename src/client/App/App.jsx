import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  withStyles,
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import styles from './styles';

const GlobalStylesApp = withStyles(styles)(props => props.children);

function App({
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
    },
  });

  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Switch>
          <GlobalStylesApp>
            {children}
          </GlobalStylesApp>
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

export default App;
