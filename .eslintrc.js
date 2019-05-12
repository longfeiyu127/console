module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: [
    'vue'
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'space-before-function-paren': [2, 'never'],
    'space-before-function-paren': 'off',
    'no-template-curly-in-string': 'off',
    'no-useless-call': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'standard/computed-property-even-spacing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': 'error',
    'vue/component-name-in-template-casing': 'error',
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/html-indent': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/object-curly-spacing': 'error'
  },

  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript'
  ]
}
