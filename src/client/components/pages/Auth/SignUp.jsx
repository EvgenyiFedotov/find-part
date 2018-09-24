import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

class SignUp extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div>
        <div>
          SignUp
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default connect()(SignUp);
