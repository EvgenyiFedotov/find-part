import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import actions from '../../../data/actions';

class SignIn extends Component {
  onClick() {
    const { dispatch } = this.props;

    dispatch(actions.navigation.value('signUp'));
  }

  render() {
    return (
      <div>
        <div>
          SignIn
        </div>

        <div>
          {this.props.params.test}
        </div>

        <div>
          <Button onClick={this.onClick.bind(this)}>To SignUp</Button>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default connect(store => store.navigation)(SignIn);
