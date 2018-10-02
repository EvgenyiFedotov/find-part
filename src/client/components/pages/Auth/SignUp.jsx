import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import actions from '../../../data/actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      passwordRepeat: '',
    };
  }

  onChange(key, ev) {
    this.setState({
      [key]: ev.target.value,
    });
  }

  onClick() {
    this.props.dispatch(actions.http.post(
      '/api/signup',
      this.state,
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <div className={classes.form}>
          <TextField
            label="Логин"
            className={classes.text}
            onChange={this.onChange.bind(this, 'login')}
          />

          <TextField
            label="Пароль"
            type="password"
            className={classes.text}
            onChange={this.onChange.bind(this, 'password')}
          />

          <TextField
            label="Повторите пароль"
            type="password"
            className={classes.text}
            onChange={this.onChange.bind(this, 'passwordRepeat')}
          />

          <Button
            color="primary"
            className={classes.submitButton}
            onClick={this.onClick.bind(this)}
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
