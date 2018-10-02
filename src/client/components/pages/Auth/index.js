import { combineReducers } from 'redux';

import createNavigation from '../../higher/navigation.jsx';
import reducers from '../../../data/reducers';
import types, { getTypesValues } from '../../../data/types';
import middleware from '../../../data/middleware';

import Container from './Container.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

export default {
  content: createNavigation({
    signIn: { component: SignIn },
    signUp: { component: SignUp },
  }, {
    defaultValue: 'signIn',
    Container: {
      component: Container,
    },
  }),

  reducers: combineReducers({
    navigation: reducers.navigation,
  }),

  middleware: [
    middleware.cookiesPage(getTypesValues(types.navigation), 'Auth', 'navigation'),
    middleware.http(),
  ],
};
