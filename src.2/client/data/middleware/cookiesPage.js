import bCookies from 'browser-cookies';

/**
 * @param {String[]} types
 * @param {String} namePage
 * @param {String} nameField
 */
export default function cookiesPage(types = [], namePage, nameField) {
  return ({ getState }) => next => (action) => {
    next(action);

    if (types.indexOf(action.type) !== -1 && namePage && nameField) {
      let value = JSON.parse(bCookies.get(namePage) || null);

      value = {
        ...value,
        [nameField]: getState()[nameField],
      };

      bCookies.set(namePage, JSON.stringify(value));
    }
  };
}
