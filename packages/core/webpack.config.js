const path = require('path');
const nodeExternals = require('webpack-node-externals');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  entry: './src/index.ts',
  externals: [nodeExternals({
    whitelist: ['react-transition-group', 'recompose']
  })],
  mode: "production",
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: "@refract-cms/core",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(tsx|ts)?$/,
        loader: 'prettier-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new ProgressBarPlugin()
  ]
};