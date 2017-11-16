import config from './rollup.config.js'

import pkg from './package.json'
import babel from 'rollup-plugin-babel'

export default Object.assign({}, config, {
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'reduxActive',
  },
  plugins: [
    ...config.plugins,
    babel({
      exclude: 'node_modules/**',
    }),
  ],
})
