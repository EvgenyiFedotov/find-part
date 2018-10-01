import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import Appl from '../statefull/App';

export default function MainApp(store) {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });

  return (
    <JssProvider generateClassName={generateClassName}>
      <Provider store={store}>
        <Appl />
      </Provider>
    </JssProvider>
  );
}
