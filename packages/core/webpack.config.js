const path = require('path');
const nodeExternals = require('webpack-node-externals');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HappyPack = require('happypack');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  entry: './src/index.ts',
  // externals: [nodeExternals({
  //   whitelist: ['react-transition-group', 'recompose']
  // })],
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules')
    })
  ],
  devtool: 'inline-source-map',
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
      { test: /\.tsx?$/, loader: "ts-loader", options: { transpileOnly: true } },
      // {
      //   test: /\.tsx?$/,
      //   loader: 'awesome-typescript-loader',
      //   exclude: /node_modules/,
      //   query: {
      //     declaration: false,
      //   }
      // },
      // { loader: 'cache-loader' },
      // {
      //   loader: 'thread-loader',
      //   options: {
      //     // there should be 1 cpu for the fork-ts-checker-webpack-plugin
      //     workers: require('os').cpus().length - 1,
      //   },
      // },
      // {
      //   loader: 'ts-loader',
      //   options: {
      //     happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
      //   }
      // },
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'happypack/loader?id=ts'
      // },
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
    new ProgressBarPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin()
    // new HappyPack({
    //   id: 'ts',
    //   threads: 2,
    //   loaders: [
    //     {
    //       path: 'ts-loader',
    //       query: { happyPackMode: true }
    //     }
    //   ]
    // }),
    // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ]
};