import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import Container from './Container.jsx';
import styles from './styles';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "auth-dashboard" */ '../dashboard'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/dashboard'],
});

function Auth({ classes, getCookies }) {
  return (
    <div>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact render={({ location }) => {
        const { session } = getCookies ? getCookies() : {};

        if (session) {
          return location.pathname !== '/dashboard'
            ? <Redirect to="/dashboard" />
            : null;
        }

        return (
          <Container>
            <div className={classes.content}>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/auth/signin" component={SignIn} />
              <Route exact path="/auth/signup" component={SignUp} />
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
};

export default withStyles(styles)(Auth);
