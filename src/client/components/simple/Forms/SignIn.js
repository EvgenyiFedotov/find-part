import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sign from './Sign';

import { nav as navi } from '../../../providerStore';

class SignIn extends Component {
  onSendSuccess(result, response) {
    const { dispatch, nav } = this.props;

    if (response.code === 201) {
      dispatch(navi.actions.setParams({
        ...nav.params,
        inouts: result,
      }));
    } else {
      dispatch(navi.actions.setRoute('dashboard'));
    }

    // this.setState({
    //   isValid: Sign.getDefIsValid(),
    // });
  }

  onSendError() {
    this.setState({
      isValid: {
        ...this.state.isValid,
        login: true,
        password: true,
      },
    });
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
  nav: PropTypes.object,
};

export default connect()(SignIn);
