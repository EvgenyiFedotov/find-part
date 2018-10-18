import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Container from './components/Container.jsx';

const Auth = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard-auth" */ '../auth'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/dashboard'],
});

function Dashboard({ getCookies }) {
  const { session } = getCookies ? getCookies() : {};

  return (
    <div>
      <Route path="/auth" render={() => {
        if (session) {
          return <Redirect to="/dashboard" />;
        }

        return <Auth getCookies={getCookies} />;
      }}/>

      <Route exact path="/dashboard" component={Container} />
    </div>
  );
}

Dashboard.propTypes = {
  getCookies: PropTypes.func,
};

export default Dashboard;
