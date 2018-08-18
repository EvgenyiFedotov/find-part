/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import providerStore from './providerStore';
import Appl from './components/statefull/App';
import './styles/index.scss';

let store = document.getElementById('store').getAttribute('data-json');
store = typeof store === 'string' ? JSON.parse(store) : {};

ReactDOM.hydrate((
  <Provider store={createStore(providerStore, store)}>
    <Appl />
  </Provider>
), document.getElementById('root'));
