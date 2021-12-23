
/**@type {import('eslint').Linter.Config} */
// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'semi': [2, 'never'],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/semi': 'off',
    'curly': 'warn',
    'eqeqeq': 'warn',
    'no-throw-literal': 'warn',
    'quotes': [2, 'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'indent': ['warn', 2]
  }
}

