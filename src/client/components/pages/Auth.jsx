import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

class Auth extends Component {
  render() {
    console.log(this.props);

    return (
      <div></div>
    );
  }
}

export default connect(store => store)(Auth);
