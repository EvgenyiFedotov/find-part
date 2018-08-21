import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

class SignIn extends Component {
  render() {
    return (
      <Sign
        socket={this.props.socket}
        method={'user/signIn'}
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
