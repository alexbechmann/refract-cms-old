const path = require('path');
const nodeExternals = require('webpack-node-externals');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  entry: './src/server.ts',
  target: 'node',
  externals: process.env.NODE_ENV === 'production' ? [] : [nodeExternals()],
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": srcPath('')
    }
  }
};