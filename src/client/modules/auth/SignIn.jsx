import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Form from '../../components/statefull/Form.jsx';
import styles from './styles';

class SignIn extends Component {
  onClick() {
    this.form.submit(this.form.state.values);
  }

  onSubmitSuccess() {
    this.props.history.replace('/dashboard');
  }

  render() {
    const { classes } = this.props;

    return (
      <Form
        url="/api/auth/signin"
        method="GET"
        className={classes.form}
        ref={(el) => { this.form = el; }}
        onSubmitSuccess={this.onSubmitSuccess.bind(this)}
      >
        <TextField
          label="Логин"
          value=""
          field="login"
          className={classes.text}
        />

        <TextField
          label="Пароль"
          type="password"
          field="password"
          value=""
          className={classes.text}
        />

        <Button
          color="primary"
          className={classes.submitButton}
          onClick={this.onClick.bind(this)}
        >
          Отправить
        </Button>
      </Form>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(withStyles(styles)(SignIn));
