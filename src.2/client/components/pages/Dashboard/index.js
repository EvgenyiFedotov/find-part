import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from '../../../data/reducers';
import types, { getTypesValues } from '../../../data/types';
import middleware from '../../../data/middleware';

import Page from '../../statefull/Page.jsx';

export const getStore = (props = {}) => {
  const { cookiesByUrl } = props;

  return createStore(
    combineReducers({
      navigation: reducers.navigation,
    }),
    { ...cookiesByUrl },
    applyMiddleware(
      middleware.cookiesPage(
        getTypesValues(types.navigation),
        '/dashboard',
        'navigation',
      ),
      middleware.http(),
      middleware.location(),
    ),
  );
};

export default class Dashboard extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Page
          title="FindPart:Dashboard"
        />
      </Provider>
    );
  }
}

Dashboard.propTypes = {
  store: PropTypes.object,
};
