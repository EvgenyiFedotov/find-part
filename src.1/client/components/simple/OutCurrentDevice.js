import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DialogActions, Button } from '@material-ui/core';
import cookies from 'browser-cookies';
import { nav as navi } from '../../data';

class OutCurrentDevice extends Component {
  success() {
    const { dispatch } = this.props;
    const { setParams } = navi.actions;

    cookies.erase('inout');

    dispatch(setParams({
      mode: 'signIn',
    }));
  }

  render() {
    return (
      <div>
        <DialogActions>
          <Button
            size="small"
            color="secondary"
          >
            Сообщить о проблеме
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={this.success.bind(this)}
          >
            Это был я
          </Button>
        </DialogActions>
      </div>
    );
  }
}

OutCurrentDevice.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(OutCurrentDevice);
