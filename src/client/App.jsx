import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  createGenerateClassName,
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import modules from './components/modules';

export default function App(props = {}) {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });

  const { page, defStore, cookies } = props;
  const currentPage = page || 'Auth';
  const Module = modules[currentPage];
  const createPage = () => !!Module && !!Module.content
    && <Module.content />;
  const cookiesPage = cookies && cookies[currentPage]
    && JSON.parse(cookies[currentPage]);
  const store = Module && !!Module.reducers
    && createStore(
      Module.reducers,
      { ...cookiesPage, ...defStore },
      applyMiddleware(...(Module.middleware || [])),
    );

  console.log(store.getState());

  return {
    content: (
      <JssProvider generateClassName={generateClassName}>
        <div className="app">
          {!!store && (
            <Provider store={store}>
              {createPage()}
            </Provider>
          )}

          {!store && createPage()}
        </div>
      </JssProvider>
    ),
    store,
  };
}

App.propTypes = {
  page: PropTypes.string,
  defStore: PropTypes.any,
};
