import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import indigo from '@material-ui/core/colors/indigo';
import { Dialog, Typography } from '@material-ui/core';

import { nav as navi } from '../../../data';

import AuthTopBar from '../../stateless/AuthTopBar.jsx';
import SignIn from '../../simple/Forms/SignIn';
import SignUp from '../../simple/Forms/SignUp';
import Inouts from '../../simple/Inouts';
import OutCurrentDevice from '../../simple/OutCurrentDevice';

const header = {
  padding: '8px 8px 0 8px',
  color: indigo[500],
  textAlign: 'center',
};

export class Index extends Component {
  onNav(mode) {
    this.props.dispatch(navi.actions.setParams({
      mode,
    }));
  }

  render() {
    const { params } = this.props.nav;
    let content;
    let dialog = {
      open: false,
      header: '',
      content: null,
    };

    switch (params.mode) {
      case 'signIn':
        content = <SignIn />;
        break;
      case 'signUp':
        content = <SignUp />;
        break;
      default:
        content = <div className="logo-banner">FINDPART</div>;
        break;
    }

    if (params.isOutCurrentDevice) {
      dialog = {
        open: true,
        header: 'С текущего устройства был выполнен выход',
        content: <OutCurrentDevice />,
      };
    } else if (params.inouts) {
      dialog = {
        open: true,
        header: 'Не выполнен выход на других устроствах',
        content: <Inouts list={params.inouts} />,
      };
    }

    return (
      <div className="auth">
        <div className="top">
          <AuthTopBar
            logo={'FINDPART'}
            onNav={this.onNav.bind(this)}
          />
        </div>

        <div className="content">{content}</div>

        <Dialog open={dialog.open}>
          <Typography variant="title" gutterBottom style={header}>
            {dialog.header}
          </Typography>

          {dialog.content}
        </Dialog>
      </div>
    );
  }
}

Index.propTypes = {
  nav: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(store => ({
  nav: store.nav,
}))(Index);
