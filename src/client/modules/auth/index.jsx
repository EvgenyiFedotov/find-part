import React from 'react';
import { Route } from 'react-router-dom';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

export default function Auth() {
  return [
    <Route key={0} exact path="/" component={SignIn} />,
    <Route key={1} exact path="/auth/signin" component={SignIn} />,
    <Route key={2} exact path="/auth/signup" component={SignUp} />,
  ];
}
