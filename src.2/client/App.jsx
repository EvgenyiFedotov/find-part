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
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Auth, { getStore as getStoreAuth } from './components/pages/Auth';

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './components/pages/Dashboard'),
  loading() {
    return (<div>Loading...</div>);
  },
  delay: 1000,
  modules: ['/dashboard'],
  render(loaded, props) {
    const Component = loaded.default;
    return <Component store={loaded.getStore(props)}/>;
  },
});

export default function App({
  cookiesByUrl = null,
  sheetsRegistry = null,
  sheetsManager = null,
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
          <Route path="/dashboard" render={() => (
            <Dashboard cookiesByUrl={cookiesByUrl} />
          )} />
          <Route render={() => (
            <Auth store={getStoreAuth({ cookiesByUrl })} />
          )}/>
        </Switch>
      </MuiThemeProvider>
    </JssProvider>
  );
}

App.propTypes = {
  isClient: PropTypes.bool,
  cookiesByUrl: PropTypes.object,
  sheetsRegistry: PropTypes.object,
  sheetsManager: PropTypes.object,
};
