import React from 'react';

import App from '../../App';
import Dashboard from './index.jsx';

export default App.server({
  children: <Dashboard />,
  modulesLoaded: ['/dashboard'],
});
