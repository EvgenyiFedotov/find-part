import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthView from './Pages/Auth';
import DashboardView from './Pages/Dashboard';

import { socket } from '../../data';

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(socket.actions.create());
  }

  render() {
    const { nav } = this.props;
    const { route } = nav;
    let content;

    if (route === 'auth' || !route) {
      content = <AuthView />;
    } else {
      content = <DashboardView />;
    }

    return <div className="app">{content}</div>;
  }
}

App.propTypes = {
  nav: PropTypes.object,
  dispatch: PropTypes.func,
  socket: PropTypes.object,
};

export default connect(store => store)(App);
