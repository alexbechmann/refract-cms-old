const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const SimpleProgressWebpackPlugin = require( 'simple-progress-webpack-plugin' );

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3001",
    "webpack/hot/only-dev-server",
    "./consumer/src/client/index.tsx",
  ],
  mode: 'development',
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // include: [
        //   path.resolve(__dirname, 'workplace-app'),
        //   path.resolve(__dirname, 'api'),
        //   path.resolve(__dirname, 'workplace-core'),
        //   path.resolve(__dirname, 'workplace-headless'),
        //   path.resolve(__dirname, 'news')
        // ],
        options: {
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { modules: false, targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', // MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }
    ],
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   "process.env": { BUILD_TARGET: JSON.stringify("client") },
    // }),
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
      "@refract-cms/core": path.join(__dirname, "packages", "core", "src/"),
      "@refract-cms/dashboard": path.join(__dirname, "packages", "dashboard", "src/"),
      "@refract-cms/server": path.join(__dirname, "packages", "server", "src/"),
    }
  },
  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true
  },
  output: {
    path: path.join(__dirname, ".build"),
    publicPath: "http://localhost:3001/",
    filename: "client.js",
  },
};