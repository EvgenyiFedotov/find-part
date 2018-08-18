import React, { Component } from 'react';
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
  render() {
    const { mode } = this.props;

    return (
      <div className="sign">
        <div className="header">{header(mode)}</div>
        <Input
          placeholder="Логин"
          className="input"
        />
        <Input
          placeholder="Пароль"
          type="password"
          className="input"
        />
        { mode === 'up' && <Input
          placeholder="Повторите пароль"
          type="password"
          className="input"
        /> }
        <Button variant="contained" color="primary">Отправить</Button>
      </div>
    );
  }
}

Sign.propTypes = {
  mode: PropTypes.string,
};

Sign.defaultProps = {
  mode: 'in', // up
};

export default Sign;
