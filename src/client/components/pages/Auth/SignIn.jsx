import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import Page from '../../statefull/Page.jsx';
import actions from '../../../data/actions';

class SignIn extends Component {
  onClick() {
    const { dispatch } = this.props;

    dispatch(actions.navigation.value('signUp'));
  }

  render() {
    return (
      <Page
        title="FindPart"
        toolbarButtons={[
          { value: 'Вход' },
          { value: 'Регистрация' },
        ]}
      >
        <div>
          {this.props.params.test}
        </div>

        <div>
          <Button color="primary" onClick={this.onClick.bind(this)}>To SignUp</Button>
        </div>
      </Page>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

export default connect(store => store.navigation)(SignIn);
