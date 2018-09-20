import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import Route from './components/statefull/Route.jsx';
import pages from './components/pages';

export default function App(props) {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });

  return (
    <JssProvider generateClassName={generateClassName}>
      <Route page="Auth" pages={pages} {...props} />
    </JssProvider>
  );
}
