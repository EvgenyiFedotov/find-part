import { combineReducers } from 'redux';
import socket, { reducer as rSocket } from './socket';
import nav, { reducer as rNav } from './nav';

export default combineReducers({
  socket: rSocket,
  nav: rNav,
});

export {
  socket,
  nav,
};
