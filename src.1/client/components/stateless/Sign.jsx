import React from 'react';
import { Input, Button } from '@material-ui/core';

export default function Sign(params = {}) {
  const {
    state,
    loginOnChange,
    passwordOnChange,
    onSend,
    contentAfter,
  } = params;
  let { values, isValid } = state || {};

  values = values instanceof Object ? values : {};
  isValid = isValid instanceof Object ? isValid : {};

  return (
    <div className="sign">
      <div className="header">{params.header}</div>

        <Input
          placeholder="Логин"
          className="input"
          value={values.login}
          error={isValid.login}
          onChange={loginOnChange}
        />

        <Input
          placeholder="Пароль"
          type="password"
          className="input"
          value={values.password}
          error={isValid.password}
          onChange={passwordOnChange}
        />

        {contentAfter}

        <Button
          variant="contained"
          color="primary"
          onClick={onSend}
        >
          Отправить
        </Button>
    </div>
  );
}
