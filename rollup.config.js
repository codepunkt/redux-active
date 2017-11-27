import { minify } from 'uglify-es'
import copy from 'rollup-plugin-copy'
import uglify from 'rollup-plugin-uglify'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

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
  plugins: [
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    copy({
      'src/types.d.ts': 'dist/types.d.ts',
    }),
    cleanup({
      comments: 'none',
    }),
    uglify({}, minify),
    filesize(),
  ],
}
