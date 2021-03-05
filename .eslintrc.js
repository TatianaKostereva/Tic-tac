const path = require('path');

module.exports = {
  parser: 'vue-eslint-parser',
  globals: {
    window: true,
    document: false,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/recommended',
    '@vue/typescript',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': path.join(__dirname, 'source'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
          },
        },
      },
    },
  },
  rules: {
    'arrow-parens': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['off'],
    'linebreak-style': 0,
    'no-new': 0,
    'no-bitwise': [
      'error',
      {
        allow: ['~'],
      },
    ],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-irregular-whitespace': 0,
    'class-methods-use-this': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
      },
    ],
  },
};
