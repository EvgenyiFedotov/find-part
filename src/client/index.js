/* global document */
import ReactDOM from 'react-dom';
import App from './App.jsx';

let defStore = document.getElementById('defStore').getAttribute('data-json');
defStore = typeof defStore === 'string' ? JSON.parse(defStore) : {};

ReactDOM.hydrate(
  App({ defStore }).content,
  document.getElementById('root'),
);
