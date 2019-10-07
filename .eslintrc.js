module.exports = {
  root: true,
  'extends': [
    'plugin:vue/essential'

  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0,
    'vue/no-v-html': 'error',
    'vue/this-in-template': 'warning',
    'vue/camelcase': 'warning'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
