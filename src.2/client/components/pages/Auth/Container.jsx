import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../../statefull/Page.jsx';
import actions from '../../../data/actions';

class Container extends Component {
  onClick(value) {
    const { dispatch } = this.props;

    dispatch(actions.navigation.value(value));
  }

  render() {
    const { children } = this.props;

    return (
      <Page
        title="FindPart"
        toolbarButtons={[
          {
            value: 'Вход',
            onClick: this.onClick.bind(this, 'signIn'),
          },
          {
            value: 'Регистрация',
            onClick: this.onClick.bind(this, 'signUp'),
          },
        ]}
      >
        {children}
      </Page>
    );
  }
}

Container.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  children: PropTypes.any,
};

export default connect(store => store.navigation)(Container);
