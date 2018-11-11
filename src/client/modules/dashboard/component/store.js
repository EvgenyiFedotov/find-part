import { createStore, combineReducers, applyMiddleware } from 'redux';
import Companies from 'modules/companies';

export default createStore(
  combineReducers({
    companies: Companies.data.reducer,
  }),
  applyMiddleware(
    Companies.data.middleware,
  ),
);
