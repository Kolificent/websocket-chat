module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-magic-numbers': ['warn', { ignore: [1, 0, -1] }],
    'no-console': 'warn',
    'no-constant-condition': 'warn',
    eqeqeq: 'warn',
    'no-debugger': 'warn',
    'no-compare-neg-zero': 'warn',
    'no-const-assign': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-unused-vars': 'warn',
    'valid-typeof': 'warn',
    'max-lines-per-function': [
      'warn',
      {
        max: 40,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'prefer-const': 'warn',
    'for-direction': 'warn',
    'no-shadow': 'warn',
  },
};
