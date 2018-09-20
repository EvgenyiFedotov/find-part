/* global document */
import ReactDOM from 'react-dom';
import App from './App.jsx';

let stateStore = document.getElementById('stateStore').getAttribute('data-json');
stateStore = typeof stateStore === 'string' ? JSON.parse(stateStore) : {};

ReactDOM.hydrate(
  App({ stateStore }),
  document.getElementById('root'),
);
