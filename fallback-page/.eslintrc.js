module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-use-before-define': ['error', { functions: false }],
  },
};
