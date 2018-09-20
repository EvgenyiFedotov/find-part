import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

class Auth extends Component {
  render() {
    console.log(this.props);

    return (
      <Provider store={
        createStore((store = { test: 123 }) => store, this.props.stateStore)
      }>
        <div>Auth</div>
      </Provider>
    );
  }
}

Auth.propTypes = {
  stateStore: PropTypes.object,
};

export default Auth;
