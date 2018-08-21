import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IndexTop from '../simple/IndexTop';
import SignIn from '../simple/Forms/SignIn';
import SignUp from '../simple/Forms/SignUp';

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
    const { route, mode } = nav;
    let top;
    let content;

    if (route === 'index') {
      top = <IndexTop />;

      if (mode === 'signIn') {
        content = <SignIn />;
      } else if (mode === 'signUp') {
        content = <SignUp />;
      } else {
        content = <div className="logo-banner">FINDPART</div>;
      }
    }

    return (
      <div className="app">
        <div className="top">{top}</div>
        <div className="content">{content}</div>
      </div>
    );
  }
}

App.propTypes = {
  nav: PropTypes.object,
  dispatch: PropTypes.func,
  socket: PropTypes.object,
};

export default connect(store => store)(App);
