const path = require('path');
const nodeExternals = require('webpack-node-externals');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  entry: './src/index.ts',
  externals: [nodeExternals({
    whitelist: ['@firestore-cms/functions']
  })],
  mode: "production",
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'this'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'prettier-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};