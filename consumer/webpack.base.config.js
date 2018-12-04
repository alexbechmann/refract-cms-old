const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: "development",
  stats: 'errors-only',
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
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      memoryLimit: 2048,
      tslint: path.resolve(__dirname, 'tslint.json'),
      // reportFiles: ["./src/**"],
      async: false
    }),
    // new FriendlyErrorsWebpackPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js']
  },
}