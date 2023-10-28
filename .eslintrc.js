/** @type { import('eslint').Linter.Config } */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    // necessary for some airbnb ts stuff
    project: [ './tsconfig.json', './tsconfig.eslint.json' ],
    tsconfigRootDir: __dirname,
  },
  env: { es6: true, browser: true },
  plugins: [ '@typescript-eslint' ],
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'max-len': [ 'error', { ignoreComments: true, code: 120 } ],
    'no-multiple-empty-lines': [ 'error', { max: 2, maxEOF: 0, maxBOF: 0 } ],
    '@typescript-eslint/type-annotation-spacing': [ 'error', { after: true } ],
    'space-in-parens': [ 'error', 'always' ],
    'import/prefer-default-export': 'off',
    'no-void': 'off',
    'react/prefer-stateless-function': 'off',
    'jsx-quotes': [ 'error', 'prefer-single' ],
    'no-underscore-dangle': 'off',
    'arrow-parens': [ 'error', 'as-needed' ],
    '@typescript-eslint/no-shadow': 'off',
    'computed-property-spacing': [ 'error', 'always' ],
    'react/jsx-curly-spacing': [ 'error', 'always' ],
    'react/prop-types': 'off',
    '@typescript-eslint/member-delimiter-style': 'error',
    'array-bracket-spacing': [ 'error', 'always' ],
  },
};

// eslint-disable-next-line no-undef
module.exports = config;
