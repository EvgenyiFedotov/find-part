import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import axios from 'axios';
import { withRouter } from 'react-router';

import Container from '../../components/simple/Container.jsx';

const Auth = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard-auth" */ '../auth'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/dashboard'],
});

class Dashboard extends Component {
  onNavigate(value) {
    axios.get('/api/auth/signout').then(({ data }) => {
      if (data.success) {
        this.container.historyPush(value);
      }
    });
  }

  render() {
    const { getCookies, history } = this.props;

    console.log(history);

    return (
      <div>
        <Route
          exact
          path="/auth"
          render={() => <Auth getCookies={getCookies} />}
        />

        <Route
          render={({ location }) => {
            const { session } = getCookies ? getCookies() : {};

            if (!session) {
              return location.pathname !== '/auth'
                ? <Redirect to="/auth" />
                : null;
            }

            return (
              <Container
                wrappedComponentRef={(el) => { this.container = el; }}
                title="Findpart: Рабочий стол"
                tools={[{
                  children: 'Выход',
                  onClick: this.onNavigate.bind(this, '/auth'),
                }]}
              >
                Dashboadr
              </Container>
            );
          }}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCookies: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(Dashboard);
