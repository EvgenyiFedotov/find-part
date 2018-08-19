import { combineReducers } from 'redux';
import socket from './socket';
import nav from './nav';

export default combineReducers({
  socket,
  nav,
});
