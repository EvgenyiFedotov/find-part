import { combineReducers } from 'redux';

import createNavigation from '../../higher/navigation.jsx';
import reducers from '../../../data/reducers';
import types from '../../../data/types';
import middleware from '../../../data/middleware';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const navTValues = Object.keys(types.navigation)
  .map(key => types.navigation[key]);

export default {
  content: createNavigation({
    signIn: { view: SignIn },
    signUp: { view: SignUp },
  }, 'signIn'),

  reducers: combineReducers({
    navigation: reducers.navigation,
  }),

  middleware: [
    middleware.cookiesPage(navTValues, 'Auth', 'navigation'),
  ],
};
