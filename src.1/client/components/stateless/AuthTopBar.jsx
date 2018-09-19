import React from 'react';
import Button from '@material-ui/core/Button';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = {
  logo: {
    flexGrow: 1,
  },
};

export default function AuthTopBar(params = {}) {
  const { logo, onNav } = params;

  return (
    <div>
      <AppBar position="absolute" color="default">
        <Toolbar>
          <Typography
            variant="title"
            color="primary"
            onClick={onNav && onNav.bind(this, null)}
            style={styles.logo}
          >
            {logo}
          </Typography>

          <div>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
