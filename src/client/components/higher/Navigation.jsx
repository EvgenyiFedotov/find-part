import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const navigate = createStore((store = {}) => store);

export default function createNavigation(Component) {
  return class Navigation extends React.Component {
    render() {
      const { props } = this;

      return (
        <Provider store={navigate}>
          <Component />
        </Provider>
      );
    }
  };
}
