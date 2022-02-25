module.exports = {
  extends: 'react-app',
  plugins: ['prettier'],
  rules: {
    semi: 2,
    strict: 1,
    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 0,
    'init-declarations': 1,
    'arrow-spacing': 1,
    'no-var': 2,
    'prefer-template': 1,
    'prettier/prettier': 1,
    'object-shorthand': 2,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/no-anonymous-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/alt-text': 0,
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
  },
};
