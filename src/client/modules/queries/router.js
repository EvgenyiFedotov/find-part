import React from 'react';
import { Route } from 'react-router-dom';
import Component from './component';

function Router() {
  return (
    <div>
      <Route exact path="/queries" component={Component.main} />
    </div>
  );
}

export default Router;
