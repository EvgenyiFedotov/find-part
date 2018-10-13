import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {},
    };
  }

  onChange(key, ev) {
    this.setState({
      values: {
        ...this.state.values,
        [key]: ev.target.value,
      },
    });
  }

  render() {
    const { classes } = this.props;
    const { values, errors } = this.state;

    return (
      <div className={classes.form}>
        <TextField
          label="Логин"
          className={classes.text}
          value={values.login || ''}
          error={!!errors.login}
          onChange={this.onChange.bind(this, 'login')}
        />

        <TextField
          label="Пароль"
          type="password"
          className={classes.text}
          value={values.password || ''}
          error={!!errors.password}
          onChange={this.onChange.bind(this, 'password')}
        />

        <Button
          color="primary"
          className={classes.submitButton}
          // onClick={this.onClick.bind(this)}
        >
          Отправить
        </Button>
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignIn);
