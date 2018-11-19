import { createStore, combineReducers, applyMiddleware } from 'redux';
import companies from 'modules/companies';
import partners from 'modules/partners';

export default createStore(
  combineReducers({
    companies: companies.storeConfig.reducer,
    partners: partners.storeConfig.partners.reducer,
    queries: partners.storeConfig.queries.reducer,
  }),
  applyMiddleware(
    companies.storeConfig.middleware,
    partners.storeConfig.queries.middleware,
  ),
);
