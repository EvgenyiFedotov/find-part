import React from 'react';
import { Route } from 'react-router-dom';

import Container from './Container.jsx';

export default function Dashboard() {
  return <Route component={Container} />;
}
