import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Container from './components/Container.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "auth-dashboard" */ '../dashboard'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/dashboard'],
});

function createContainer({ session, component, ...props }) {
  return function createContainerReturn() {
    if (session) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container>
        {!!component && React.createElement(component, props)}
      </Container>
    );
  };
}

function Auth({ getCookies }) {
  const { session } = getCookies ? getCookies() : {};
  const containerSignIn = createContainer({
    component: SignIn,
    session,
  });

  return (
    <div>
      <Route path="/dashboard" render={() => {
        if (!session) {
          return <Redirect to="/auth" />;
        }

        return <Dashboard getCookies={getCookies} />;
      }}/>
      <Route exact path="/" render={containerSignIn} />
      <Route exact path="/auth" component={containerSignIn} />
      <Route exact path="/auth/signin" component={containerSignIn} />
      <Route exact path="/auth/signup" component={
        createContainer({
          component: SignUp,
          session,
        })
      } />
    </div>
  );
}

Auth.propTypes = {
  getCookies: PropTypes.func,
};

export default Auth;
