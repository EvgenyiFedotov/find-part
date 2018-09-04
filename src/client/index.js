/* global document */
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import data from './data';
import MainApp from './components/stateless/MainApp.jsx';
import './styles/index.scss';

let store = document.getElementById('store').getAttribute('data-json');
store = typeof store === 'string' ? JSON.parse(store) : {};

store = createStore(data, store);

ReactDOM.hydrate(
  MainApp(store),
  document.getElementById('root'),
);
