import React from 'react';
import { Route } from 'react-router-dom';

import Container from './Container.jsx';

export default function Auth() {
  return <div>
    <Route path="/auth" render={() => (<div>123</div>)} />
    <Route component={Container}/>
  </div>;
}
