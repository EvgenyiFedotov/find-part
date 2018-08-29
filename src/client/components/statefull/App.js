import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cookies from 'browser-cookies';

import Auth from './Pages/Auth';

import { socket } from '../../providerStore';

export class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(socket.actions.create());

    console.log(cookies.all());
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
