const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // https://webpack.js.org/plugins/mini-css-extract-plugin/
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  ...baseConfig,
  // name: 'client',
  entry: [
    'webpack-dev-server/client?https://localhost:3443',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'src', 'client', 'index.tsx')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.bundle.js"
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          //MiniCssExtractPlugin.loader,
          'css-loader',
          //'postcss-loader',
          // 'sass-loader',
        ],
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'src/client/public'),
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/cms': 'http://localhost:2048'
    }
  }
}