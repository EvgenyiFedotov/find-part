import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import routeMap from './routes-map';
import Container from '../../components/simple/Container.jsx';
import styles from './styles';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "auth-dashboard" */ '../dashboard'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/dashboard'],
});
const routes = {
  SignIn: { component: SignIn },
  SignUp: { component: SignUp },
};

function Auth({ classes, getCookies, tools }) {
  return (
    <div>
      {/* transitions */}
      <Route
        exact
        path="/dashboard"
        render={() => <Dashboard getCookies={getCookies} />}
      />

      {/* main route */}
      <Route exact render={({ location }) => {
        const { session } = getCookies ? getCookies() : {};

        if (session) {
          return location.pathname !== '/dashboard'
            ? <Redirect to="/dashboard" />
            : null;
        }

        return (
          <Container
            title="Findpart"
            tools={tools}
          >
            <div className={classes.content}>
              {
                Object.keys(routeMap).map((path, key) => (
                  <Route key={key} exact path={path} {...routes[routeMap[path]]} />
                ))
              }
            </div>
          </Container>
        );
      }} />
    </div>
  );
}

Auth.propTypes = {
  classes: PropTypes.object,
  getCookies: PropTypes.func,
  tools: PropTypes.array,
};

Auth.defaultProps = {
  tools: [{
    children: 'Вход',
    to: '/auth/signin',
  }, {
    children: 'Регистрация',
    to: '/auth/signup',
  }],
};

export default withStyles(styles)(Auth);
