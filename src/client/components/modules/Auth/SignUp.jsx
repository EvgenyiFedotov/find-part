import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class SignUp extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.form}>
          <TextField
            label="Логин"
            className={classes.text}
          />

          <TextField
            label="Пароль"
            type="password"
            className={classes.text}
          />

          <TextField
            label="Повторите пароль"
            type="password"
            className={classes.text}
          />

          <Button
            color="primary"
            className={classes.submitButton}
          >
            Отправить
          </Button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  classes: PropTypes.object,
};

const SignInWithStyles = withStyles(styles)(SignUp);

export default connect()(SignInWithStyles);
