import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from '../../../data/reducers';
import types, { getTypesValues } from '../../../data/types';
import middleware from '../../../data/middleware';

import Container from './Container.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import NavigationItem from '../../stateless/NavigationItem.jsx';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: createStore(
        combineReducers({
          navigation: reducers.navigation,
        }),
        { ...props.cookiesByUrl },
        applyMiddleware(
          middleware.cookiesPage(
            getTypesValues(types.navigation),
            '/auth',
            'navigation',
          ),
          middleware.http(),
        ),
      ),
    };
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Container>
          <NavigationItem component={SignIn} />
          <NavigationItem path="signIn" component={SignIn} />
          <NavigationItem path="signUp" component={SignUp} />
        </Container>
      </Provider>
    );
  }
}

Auth.propTypes = {
  cookiesByUrl: PropTypes.object,
};
