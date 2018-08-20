import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import { nav } from '../../../providerStore';

function header(mode) {
  switch (mode) {
    case 'up': return 'Регистрация';
    default: return 'Вход';
  }
}

const defValues = {
  login: '',
  password1: '',
  password2: '',
};

const defIsValid = {
  login: false,
  password1: false,
  password2: false,
};

class Sign extends Component {
  constructor(options) {
    super(options);

    this.state = {
      values: defValues,
      isValid: defIsValid,
    };
  }

  onChange(field, event) {
    const { values } = this.state;

    this.setState({
      values: {
        ...values,
        [field]: event.target.value,
      },
    });
  }

  send() {
    const { isValid } = this.state;
    const { mode, socket, dispatch } = this.props;
    const method = `user/sign${mode}`;

    socket.api.once(method, () => {
      if (mode === 'up') {
        dispatch(nav.actions.setMode('signIn'));
      }

      this.resetIsValid();
    }, (message, status) => {
      if (mode === 'up') {
        if (status === 'PASSWORD') {
          this.setState({
            isValid: {
              ...isValid,
              password1: true,
              password2: true,
            },
          });
        } else if (status === 'LOGIN') {
          this.setState({
            isValid: {
              ...isValid,
              login: true,
            },
          });
        }
      }
    });

    socket.api.emit(method, this.state.values);
  }

  resetIsValid() {
    this.setState({
      isValid: { ...defIsValid },
    });
  }

  render() {
    const { values, isValid } = this.state;
    const { mode } = this.props;

    return (
      <div className="sign">
        <div className="header">{header(mode)}</div>

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
          value={values.password1}
          error={isValid.password1}
          onChange={this.onChange.bind(this, 'password1')}
        />

        {mode === 'up' && <Input
          placeholder="Повторите пароль"
          type="password"
          className="input"
          value={values.password2}
          error={isValid.password2}
          onChange={this.onChange.bind(this, 'password2')}
        />}

        <Button
          variant="contained"
          color="primary"
          onClick={this.send.bind(this)}
        >
          Отправить
        </Button>
      </div>
    );
  }
}

Sign.propTypes = {
  mode: PropTypes.string,
  socket: PropTypes.object,
  dispatch: PropTypes.func,
};

Sign.defaultProps = {
  mode: 'in', // up
};

export default connect(store => ({
  socket: store.socket,
}))(Sign);
