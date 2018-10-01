import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';

import { socket } from '../../../data';

class Sign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: Sign.getDefValues(props.defValues),
      isValid: Sign.getDefIsValid(props.defIsValid),
    };
  }

  static getDefValues(values = {}) {
    return { login: '', password: '', ...values };
  }

  static getDefIsValid(values = {}) {
    return { login: false, password: false, ...values };
  }

  onChange(field, event) {
    const { values } = this.state;

    this.setState({
      values: { ...values, [field]: event.target.value.trim() },
    });
  }

  validate() {
    const { onValidate } = this.props;
    const { values, isValid } = this.state;
    let newIsValid = { ...isValid };

    newIsValid.login = !values.login;
    newIsValid.password = !values.password || values.password.length < 6;

    if (onValidate instanceof Function) {
      newIsValid = onValidate.call(this, newIsValid, this.state, this.props) || newIsValid;
    }

    this.setState({ isValid: newIsValid });

    return newIsValid;
  }

  static isValid(values = {}) {
    return Object.keys(values).reduce((result, key) => result && !values[key], true);
  }

  onSend() {
    const {
      dispatch,
      method,
      onSendError,
    } = this.props;
    let { onSendSuccess } = this.props;

    if (method && Sign.isValid(this.validate())) {
      const { runMethod } = socket.actions;
      let onSendErrorBind;

      if (onSendSuccess instanceof Function) {
        onSendSuccess = onSendSuccess.bind(this);
      }

      if (onSendError instanceof Function) {
        onSendErrorBind = (message, status, ...args) => {
          const { isValid } = this.state;
          const newIsValid = { ...isValid };

          if (status === 'LOGIN') {
            newIsValid.login = true;
          } else if (status === 'PASSWORD') {
            newIsValid.password = true;
          }

          this.setState({ isValid: newIsValid });

          onSendError.call(this, message, status, ...args);
        };
      }

      dispatch(runMethod(
        'apiOnce',
        method,
        onSendSuccess,
        onSendErrorBind,
      ));
      dispatch(runMethod(
        'apiEmit',
        method,
        this.state.values,
      ));
    }
  }

  render() {
    const { header, contentAfter } = this.props;
    let { values, isValid } = this.state;

    values = values instanceof Object ? values : {};
    isValid = isValid instanceof Object ? isValid : {};

    return (
      <div className="sign">
        <div className="header">{header}</div>

          <Input
            placeholder="Логин"
            className="input"
            value={values.login}
            error={isValid.login}
            onChange={this.onChange.bind(this, 'login')}
          />

          <Input
            placeholder="Пароль"
            type="password"
            className="input"
            value={values.password}
            error={isValid.password}
            onChange={this.onChange.bind(this, 'password')}
          />

          {contentAfter && contentAfter.call(this, this.state, this.props)}

          <Button
            color="primary"
            onClick={this.onSend.bind(this)}
          >
            Отправить
          </Button>
      </div>
    );
  }
}

Sign.propTypes = {
  header: PropTypes.string,
  contentAfter: PropTypes.func,
  defValues: PropTypes.object,
  defIsValid: PropTypes.object,
  method: PropTypes.string,
  onValidate: PropTypes.func,
  onSendSuccess: PropTypes.func,
  onSendError: PropTypes.func,
  dispatch: PropTypes.func,
  nav: PropTypes.object,
};

export default connect(store => ({
  nav: store.nav,
}))(Sign);
