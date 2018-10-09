import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import styles from './styles';
import actions from '../../../data/actions';

const TestLoad = Loadable({
  loader: () => import('./test'),
  loading() {
    return (<div>Loading...</div>);
  },
});

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

  onClick() {
    const { dispatch } = this.props;

    dispatch(actions.http.get(
      '/api/auth/signin',
      this.state.values,
      (response) => {
        if (response.success) {
          const { sessions } = response;

          this.setState({ values: {} });

          if (sessions && sessions.length) {
            console.log('@sessions', sessions);
          } else {
            dispatch(actions.location.toPage('/dashboard'));
          }
        } else {
          this.setState({
            errors: response.errors || {},
          });
        }
      },
    ));
  }

  render() {
    const { classes } = this.props;
    const { values, errors } = this.state;

    return (
      <div className={classes.content}>
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
            onClick={this.onClick.bind(this)}
          >
            Отправить
          </Button>

          {(values.login && values.login.length > 4) && (
            <TestLoad value={values.login} />
          )}
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  classes: PropTypes.object,
};

const SignInWithStyles = withStyles(styles)(SignIn);

export default connect()(SignInWithStyles);
