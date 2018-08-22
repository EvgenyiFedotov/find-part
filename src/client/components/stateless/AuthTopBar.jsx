import React from 'react';
import Button from '@material-ui/core/Button';

export default function AuthTopBar(params = {}) {
  const { logo, onNav } = params;

  return (
    <div className="auth-top-bar">
      <div
        className="logo"
        onClick={onNav && onNav.bind(this, null)}
      >
        {logo}
      </div>

      <div className="buttons">
        <Button
          size="small"
          color="primary"
          onClick={onNav && onNav.bind(this, 'signIn')}
        >
          Вход
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={onNav && onNav.bind(this, 'signUp')}
        >
          Регистрация
        </Button>
      </div>
    </div>
  );
}
