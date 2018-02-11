// rollup.config.js
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [ 
    json(),
    resolve(),
    commonjs(),
    babel({  exclude: 'node_modules/**'  }),
    (process.env.NODE_ENV === 'production' && uglify())
  ],
};