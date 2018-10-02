import navigation from './navigation';
import http from './http';

export function getTypesValues(types) {
  return Object.keys(types)
    .map(key => types[key]);
}

export default {
  navigation,
  http,
};
