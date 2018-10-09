import React from 'react';
import App from '../../App';
import Auth from './index.jsx';

export default App.server({
  children: <Auth />,
  modulesLoaded: ['/auth'],
});
