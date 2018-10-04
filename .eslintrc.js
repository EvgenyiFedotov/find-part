module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:react/recommended"
  ],
  "rules": {
    "linebreak-style": ["error", "windows"],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
    "no-restricted-imports": [0],
    "class-methods-use-this": [
      "error",
      {
        "exceptMethods": [
          "componentDidMount",
          "render"
        ]
      }
    ]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
};