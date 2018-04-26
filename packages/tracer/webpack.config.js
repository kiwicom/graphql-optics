// @flow

const path = require('path')

module.exports = () => ({
  entry: './src/tracer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          babelrc: true,
        },
        include: [
          path.resolve(__dirname, 'config'),
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  target: 'node',
})
