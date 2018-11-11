import { createStore, combineReducers, applyMiddleware } from 'redux';
import companies from 'modules/companies';

export default createStore(
  combineReducers({
    companies: companies.storeConfig.reducer,
  }),
  applyMiddleware(
    companies.storeConfig.middleware,
  ),
);
