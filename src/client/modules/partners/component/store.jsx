import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Main from './main';

class Store extends Component {
  onCreate = (params) => {
    console.log('@onCreate', params);
  }

  render() {
    const { dispatch, ...props } = this.props;

    return <Main
      {...props}
      onCreate={this.onCreate}
    />;
  }
}

Store.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Store);
