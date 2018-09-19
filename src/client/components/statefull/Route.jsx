import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const navigate = createStore((store = { test: 123 }) => store);

class Route extends Component {
  render() {
    const { path, pages, stateStore } = this.props;
    const Page = pages[path];

    return (
      <div className="route">
        <Provider store={navigate}>
          { !!Page && <Page /> }
        </Provider>
      </div>
    );
  }
}

Route.propTypes = {
  path: PropTypes.string,
  pages: PropTypes.object,
  stateStore: PropTypes.object,
};

export default Route;
