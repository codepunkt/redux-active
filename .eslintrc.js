const pickBy = require('lodash/pickBy')
const without = require('lodash/without')
const baseConfig = require('eslint-config-react-app')

// use eslint-config-react-app without jsx and react related stuff
const config = Object.assign({}, baseConfig, {
  plugins: without(baseConfig.plugins, 'jsx-a11y', 'react'),
  parserOptions: Object.assign({}, baseConfig.parserOptions, {
    ecmaFeatures: Object.assign({}, baseConfig.parserOptions.ecmaFeatures, {
      jsx: false,
    }),
  }),
  rules: pickBy(
    baseConfig.rules,
    (_, name) => !name.startsWith('jsx-a11y/') && !name.startsWith('react/')
  ),
})

module.exports = config
