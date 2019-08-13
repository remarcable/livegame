module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['meteor', 'prettier'],
  extends: ['airbnb', 'plugin:meteor/recommended', 'prettier'],
  settings: {
    'import/resolver': 'meteor',
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/no-absolute-path': [0],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-use-before-define': [
      'warn',
      {
        functions: false,
        variables: false,
      },
    ],
    'consistent-this': [1, 'self'],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-wrap-multilines': 'off',
  },
};
