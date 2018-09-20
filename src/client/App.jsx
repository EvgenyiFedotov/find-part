import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import pages from './components/pages';

export default function App(props = {}) {
  const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
  });

  const { page, defStore } = props;
  const defPage = 'Auth';
  const PageConfig = pages[page || defPage];
  const createPage = () => !!PageConfig && !!PageConfig.content
    && <PageConfig.content />;
  const store = !!PageConfig.reducers && createStore(PageConfig.reducers, defStore);

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
