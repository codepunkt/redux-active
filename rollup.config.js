import pkg from './package.json'
import { minify } from 'uglify-es'
import uglify from 'rollup-plugin-uglify'
import cleanup from 'rollup-plugin-cleanup'
import license from 'rollup-plugin-license'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  sourcemap: 'inline',
  plugins: [
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    cleanup({
      comments: 'none',
    }),
    uglify({}, minify),
    license({
      banner: `<%= pkg.name %> v<%= pkg.version %>
    (c) <%= moment().format('YYYY') %> Christoph Werner <christoph@codepunkt.de>`,
    }),
    filesize(),
  ],
}
