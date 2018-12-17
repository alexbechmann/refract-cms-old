const path = require('path');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');
const StartServerPlugin = require("start-server-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  ...baseConfig,
  name: 'server',
  entry: path.resolve(__dirname, 'src', 'server', 'index.ts'),
  target: 'node',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js"
  },
  externals: process.env.NODE_ENV === 'production' ? [] : [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '..', 'node_modules')
    })
  ],
  // externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
  plugins: [
    ...baseConfig.plugins,
    // new StartServerPlugin({
    //   name: 'server.js',
    //   signal: 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
    // }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  node: {
    __dirname: true,
  }
}
