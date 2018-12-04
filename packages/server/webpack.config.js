const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: "production",
  stats: 'errors-only',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: require('./package.json').name,
    libraryTarget: "umd"
  },
  performance: {
    hints: 'warning'
  },
  optimization: {
    sideEffects: false,
    minimizer: [
      new UglifyJsPlugin({
        extractComments: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules')
    })
  ],
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.(js|jsx|ts|tsx)$/, loader: "babel-loader" },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      // memoryLimit: 4000,
      tslint: path.resolve(__dirname, '..', 'tslint.json'),
      reportFiles: "./src/**",
      async: false
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
}