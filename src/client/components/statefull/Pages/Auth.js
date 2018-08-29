import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { nav } from '../../../providerStore';

import AuthTopBar from '../../stateless/AuthTopBar.jsx';
import SignIn from '../../simple/Forms/SignIn';
import SignUp from '../../simple/Forms/SignUp';

export class Index extends Component {
  onNav(mode) {
    this.props.dispatch(nav.actions.setMode(mode));
  }

  render() {
    let content;

    switch (this.props.nav.mode) {
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

    return (
      <div className="auth">
        <div className="top">
          <AuthTopBar
            logo={'FINDPART'}
            onNav={this.onNav.bind(this)}
          />
        </div>

        <div className="content">{content}</div>
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
