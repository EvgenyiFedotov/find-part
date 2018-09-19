import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import Route from './components/statefull/Route.jsx';
// import { Provider } from 'react-redux';
import pages from './components/pages';

export default function App() {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });

  return (
    <JssProvider generateClassName={generateClassName}>
      <Route pages={pages} />
    </JssProvider>
  );
}
