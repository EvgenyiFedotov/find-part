import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Form from '../../../components/statefull/Form.jsx';
import styles from '../styles';

class SignUp extends Component {
  onClick() {
    this.form.submit(this.form.state.values);
  }

  render() {
    const { classes } = this.props;

    return (
      <Form
        className={classes.form}
        ref={(el) => { this.form = el; }}
        url="/api/auth/signup"
      >
        <TextField
          field="login"
          label="Логин"
          value=""
          className={classes.text}
        />

        <TextField
          field="password"
          label="Пароль"
          type="password"
          value=""
          className={classes.text}
        />

        <TextField
          field="passwordRepeat"
          label="Повторите пароль"
          type="password"
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

SignUp.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignUp);
