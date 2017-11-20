import babel from 'rollup-plugin-babel'
import license from 'rollup-plugin-license'

import pkg from './package.json'
import config from './rollup.config.js'

export default Object.assign({}, config, {
  input: 'src/index.umd.js',
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
    license({
      banner: `<%= pkg.name %> v<%= pkg.version %>
    (c) <%= moment().format('YYYY') %> Christoph Werner <christoph@codepunkt.de>`,
    }),
  ],
})
