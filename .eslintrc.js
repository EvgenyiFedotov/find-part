module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "rules": {
    "linebreak-style": ["error", "windows"],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    
    "no-restricted-imports": [0],
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
};