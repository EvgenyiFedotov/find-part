import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import actions from '../../../data/actions';

class SignUp extends Component {
  onClick() {
    const { dispatch } = this.props;

    dispatch(actions.navigation.value('signIn'));
    dispatch(actions.navigation.params({ test: 'is test params' }));
  }

  render() {
    return (
      <div>
        <div>
          SignUp
        </div>

        <div>

        </div>

        <div>
          <Button onClick={this.onClick.bind(this)}>To SignIn</Button>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default connect(store => store.navigation)(SignUp);
