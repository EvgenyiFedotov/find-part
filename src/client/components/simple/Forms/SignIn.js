import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

class SignIn extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch(
    //   socketActs.once('check', () => {
    //     console.log('check');
    //   }),
    // );
    // dispatch(socketActs.emit('check', 1, 2, 300));
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
