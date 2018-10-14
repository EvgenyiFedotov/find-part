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

function Auth({ classes, cookies }) {
  return [
    <Route key={0} exact path="/dashboard" component={Dashboard} />,
    <Route key={1} exact render={({ location }) => {
      if (cookies.session) {
        return location.pathname !== '/dashboard'
          ? <Redirect to="/dashboard" />
          : null;
      }

      return (
        <Container key={1}>
          <div className={classes.content}>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/auth/signin" component={SignIn} />
            <Route exact path="/auth/signup" component={SignUp} />
          </div>
        </Container>
      );
    }} />,
  ];
}

Auth.propTypes = {
  classes: PropTypes.object,
  cookies: PropTypes.object,
};

export default withStyles(styles)(Auth);
