import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class App extends Component {
  render() {
    return (
      <div>
        App: {this.props.value}
        <div>App: {this.props.value2}</div>
      </div>
    );
  }
}

App.propTypes = {
  value: PropTypes.string,
  value2: PropTypes.string,
};

App.defaultProps = {
  value: '1123123',
  value2: 'test value 2',
};

export default connect(store => store)(App);
