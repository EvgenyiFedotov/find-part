import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import axios from 'axios';

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
    const { getCookies } = this.props;
    const { session } = getCookies ? getCookies() : {};

    return (
      <div>
        <Route path="/auth" render={() => {
          if (session) {
            return <Redirect to="/dashboard" />;
          }

          return <Auth getCookies={getCookies} />;
        }}/>

        <Route
          exact
          path="/dashboard"
          render={() => {
            if (!session) {
              return <Redirect to="/auth" />;
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

export default Dashboard;
