import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

function header(mode) {
  switch (mode) {
    case 'up': return 'Регистрация';
    default: return 'Вход';
  }
}

class Sign extends Component {
  constructor(options) {
    super(options);

    this.state = {
      login: '123',
      password1: '',
      password2: '',
    };
  }

  onChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  send() {
    const { mode, socket } = this.props;

    socket.emitApi(`user/sign${mode}`, this.state);
  }

  render() {
    const { mode } = this.props;

    return (
      <div className="sign">
        <div className="header">{header(mode)}</div>

        <Input
          placeholder="Логин"
          className="input"
          value={this.state.login}
          onChange={this.onChange.bind(this, 'login')}
        />

        <Input
          placeholder="Пароль"
          type="password"
          className="input"
          value={this.state.password1}
          onChange={this.onChange.bind(this, 'password1')}
        />

        {mode === 'up' && <Input
          placeholder="Повторите пароль"
          type="password"
          className="input"
          value={this.state.password2}
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
};

Sign.defaultProps = {
  mode: 'in', // up
};

export default connect(store => ({
  socket: store.socket,
}))(Sign);
