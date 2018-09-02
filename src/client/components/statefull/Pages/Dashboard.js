import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { socket, nav } from '../../../data';

export class Dashboard extends Component {
  exit() {
    const { dispatch } = this.props;

    dispatch(socket.actions.runMethod(
      'apiCall',
      'inout/signOut',
      null,
      () => {
        dispatch(nav.actions.setRoute('auth'));
      },
    ));
  }

  render() {
    return (
      <div>
        <Button
          size="small"
          color="secondary"
          onClick={this.exit.bind(this)}
        >
          Выход
        </Button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(store => ({
  nav: store.nav,
}))(Dashboard);
