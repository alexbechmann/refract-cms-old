const path = require('path');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');

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
  node: {
    __dirname: true,
  }
}
