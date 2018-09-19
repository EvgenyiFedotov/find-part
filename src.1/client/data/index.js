import { combineReducers } from 'redux';
import socket, { reducer as rSocket } from './socket';
import nav, { reducer as rNav } from './nav';
import companies, { reducer as rCompanies } from './companies';

export default combineReducers({
  socket: rSocket,
  nav: rNav,
  companies: rCompanies,
});

export {
  socket,
  nav,
  companies,
};
