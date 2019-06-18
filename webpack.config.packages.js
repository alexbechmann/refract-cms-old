const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const DeclarationBundler = require("declaration-bundler-webpack-plugin");

const baseConfig = {
  // devtool: "inline-source-map",
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: "prettier-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".graphql"],
    alias: {
      "@refract-cms/core": path.join(__dirname, "packages", "core", "src/"),
      "@refract-cms/dashboard": path.join(
        __dirname,
        "packages",
        "dashboard",
        "src/"
      ),
      "@refract-cms/server": path.join(__dirname, "packages", "server", "src/")
    }
  }
};

function createConfig(name) {
  return {
    ...baseConfig,
    entry: `./packages/${name}/src/index.ts`,
    mode: "production",
    target: "node",
    output: {
      path: path.resolve(__dirname, "packages", name, "dist"),
      filename: "index.js",
      library: `@refract-cms/${name}`,
      libraryTarget: "umd"
    },
    plugins: [
      ...baseConfig.plugins,
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        memoryLimit: 2048,
        tslint: path.resolve(__dirname, "tslint.json"),
        reportFiles: [`./packages/${name}/src/**`],
        ignoreLints: ["**/*.test.*"],
        async: true
      })
    ]
  };
}

module.exports = [
  createConfig("core"),
  createConfig("dashboard"),
  createConfig("server")
];
