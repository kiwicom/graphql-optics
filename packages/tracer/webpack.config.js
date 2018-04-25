// @flow

const path = require('path');

const appDirectory = __dirname;

module.exports = () => ({
  context: appDirectory,
  entry: './src/tracer.js',
  output: {
    path: path.resolve(appDirectory, 'dist'),
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
          path.resolve(appDirectory, 'config'),
          path.resolve(appDirectory, 'src'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  target: 'node',
});
