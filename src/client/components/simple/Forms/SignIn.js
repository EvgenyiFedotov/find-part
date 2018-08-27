import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

class SignIn extends Component {
  onSendSuccess(...args) {
    console.log('onSendSuccess', ...args);
  }

  onSendError(...args) {
    console.log('onSendError', ...args);
  }

  render() {
    return (
      <Sign
        socket={this.props.socket}
        method={'user/signIn'}
        onSendSuccess={this.onSendSuccess}
        onSendError={this.onSendError}
      />
    );
  }
}

SignIn.propTypes = {
  socket: PropTypes.object,
};

export default connect(store => ({
  socket: store.socket,
}))(SignIn);
