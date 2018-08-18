import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IndexTop from '../simple/IndexTop';
import Sign from '../simple/Forms/Sign';

export class App extends Component {
  render() {
    const { nav } = this.props;
    const { route, mode } = nav;
    let top;
    let content;

    if (route === 'index') {
      top = <IndexTop />;

      if (mode === 'signIn') {
        content = <Sign mode="in" />;
      } else if (mode === 'signUp') {
        content = <Sign mode="up" />;
      }
    }

    return (
      <div className="app">
        <div className="top">{top}</div>
        <div className="content">{content}</div>
        <div className="footer"></div>
      </div>
    );
  }
}

App.propTypes = {
  nav: PropTypes.object,
};

export default connect(store => ({
  nav: store.nav,
}))(App);
