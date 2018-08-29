import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

import { socket } from '../../../providerStore';

class SignIn extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { runMethod } = socket.actions;

    dispatch(
      runMethod(
        'socketRunMethod',
        'once',
        'check_result',
        (...args) => {
          console.log('check_result', ...args);
        },
      ),
    );

    dispatch(
      runMethod(
        'socketRunMethod',
        'emit',
        'check',
        1,
        'asd',
        { a: 1, b: 777 },
      ),
    );
  }

  onSendSuccess(...args) {
    console.log('onSendSuccess', ...args);
  }

  onSendError(...args) {
    console.log('onSendError', ...args);
  }

  render() {
    return (
      <Sign
        method={'user/signIn'}
        onSendSuccess={this.onSendSuccess}
        onSendError={this.onSendError}
      />
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(SignIn);
