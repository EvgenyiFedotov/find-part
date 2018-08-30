import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { nav as navi } from '../../../providerStore';

import AuthTopBar from '../../stateless/AuthTopBar.jsx';
import SignIn from '../../simple/Forms/SignIn';
import SignUp from '../../simple/Forms/SignUp';
import Inouts from '../../simple/Inouts';

export class Index extends Component {
  onNav(mode) {
    this.props.dispatch(navi.actions.setParams({
      mode,
    }));
  }

  render() {
    const { mode, inouts } = this.props.nav.params;
    let content;
    let inoutsOpen = false;

    switch (mode) {
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

    if (inouts) {
      inoutsOpen = true;
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

        <Inouts open={inoutsOpen} list={inouts} />
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
