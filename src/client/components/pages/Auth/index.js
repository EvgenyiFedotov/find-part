import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import browserCookies from 'browser-cookies';

import reducers from '../../../data/reducers';
import types, { getTypesValues } from '../../../data/types';
import middleware from '../../../data/middleware';
import actions from '../../../data/actions';

import Container from './Container.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import NavigationItem from '../../stateless/NavigationItem.jsx';

const store = createStore(
  combineReducers({
    navigation: reducers.navigation,
  }),
  applyMiddleware(
    middleware.cookiesPage(
      getTypesValues(types.navigation),
      'auth',
      'navigation',
    ),
    middleware.http(),
  ),
);

export default class Auth extends Component {
  componentDidMount() {
    const cookies = JSON.parse(browserCookies.get('auth'));

    if (cookies) {
      store.dispatch(actions.navigation.value(cookies.navigation.value));
      store.dispatch(actions.navigation.params(cookies.navigation.params));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <NavigationItem component={SignIn} />
          <NavigationItem path="signIn" component={SignIn} />
          <NavigationItem path="signUp" component={SignUp} />
        </Container>
      </Provider>
    );
  }
}
