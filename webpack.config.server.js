const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

module.exports = {
  entry: ["@babel/polyfill", "webpack/hot/poll?1000", "./consumer/src/server/index.ts"],
  target: "node",
  mode: 'development',
  externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000", '@refract-cms/server', '@refract-cms/core'] })],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { modules: false, targets: { "node": "8.10" } }, // or whatever your project requires
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
            // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            'react-hot-loader/babel',
          ],
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ],
  },
  plugins: [
    new StartServerPlugin("server.js"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": { BUILD_TARGET: JSON.stringify("server") },
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      memoryLimit: 2048,
      tslint: path.resolve(__dirname, 'tslint.json'),
      reportFiles: [
        "./consumer/src/**",
        "./packages/**/src/**",
      ],
      ignoreLints: [
        "**/*.test.*"
      ],
      async: true
    }),
    // new SimpleProgressWebpackPlugin( { // Default options
    //   format: 'compact'
    // })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.graphql'],
    alias: {
      "@refract-cms/core": path.join(__dirname, "packages", "core", "src"),
      "@refract-cms/dashboard": path.join(__dirname, "packages", "dashboard", "src"),
      "@refract-cms/server": path.join(__dirname, "packages", "server", "src"),
    }
  },
  output: { path: path.join(__dirname, ".build"), filename: "server.js" },
};