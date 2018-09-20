import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'request';
import { connect } from 'react-redux';

export class Auth extends Component {
  componentDidMount() {
    const { props } = this;

    console.log(props);

    request.get(`${location.origin}/api`, (...args) => {
      console.log('@/api', ...args);
    });
  }

  render() {
    return (
      <div>Auth {this.props.test}</div>
    );
  }
}

Auth.propTypes = {
  test: PropTypes.string,
};

export default {
  content: connect(store => store)(Auth),
  reducers: (store = { test: '123' }) => store,
};
