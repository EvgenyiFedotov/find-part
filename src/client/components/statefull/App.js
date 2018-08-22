import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Auth from './Pages/Auth';

import { actions as socketActs } from '../../providerStore/socket';

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(socketActs.create());

    dispatch(socketActs.on('dispatch', (...actions) => {
      actions.forEach(action => dispatch(action));
    }));
  }

  render() {
    const { nav } = this.props;
    const { route } = nav;
    let content;

    if (route === 'auth') {
      content = <Auth />;
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
