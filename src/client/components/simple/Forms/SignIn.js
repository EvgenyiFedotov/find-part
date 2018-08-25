import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

class SignIn extends Component {
  onSendSuccess(...args) {
    console.log('onSendSuccess', ...args);
  }

  render() {
    return (
      <Sign
        socket={this.props.socket}
        method={'user/signIn'}
        onSendSuccess={this.onSendSuccess}
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
