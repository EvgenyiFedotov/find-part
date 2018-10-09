import navigation from './navigation';
import http from './http';
import location from './location';

export function getTypesValues(types) {
  return Object.keys(types)
    .map(key => types[key]);
}

export default {
  navigation,
  http,
  location,
};
