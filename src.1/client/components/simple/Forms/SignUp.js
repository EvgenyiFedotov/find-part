import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';

import Sign from './Sign';

import { nav } from '../../../data';

class SignUp extends Component {
  contentAfter(state) {
    const { values, isValid } = state;

    return (
      <Input
        placeholder="Повторите пароль"
        type="password"
        className="input"
        value={values.password2}
        error={isValid.password2}
        onChange={this.onChange.bind(this, 'password2')}
      />
    );
  }

  static onValidate(isValidIn, state) {
    const { values } = state;
    const isValid = { ...isValidIn };

    isValid.password2 = values.password !== values.password2;

    return isValid;
  }

  static onSendSuccess() {
    this.props.dispatch(nav.actions.setParams({
      mode: 'signIn',
    }));
  }

  render() {
    return (
      <Sign
        defValues={{ password2: '' }}
        defIsValid={{ password2: false }}
        contentAfter={this.contentAfter}
        onValidate={SignUp.onValidate}
        method={'user/signUp'}
        onSendSuccess={SignUp.onSendSuccess.bind(this)}
      />
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(SignUp);
