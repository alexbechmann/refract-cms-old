const webpack = require("webpack");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const baseConfig = {
  // devtool: "inline-source-map",
  mode: 'production',
  target: "web",
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
              {
                targets: {
                  browsers: 'last 2 versions'
                },
                modules: false
              }
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
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
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      memoryLimit: 2048,
      tslint: path.resolve(__dirname, 'tslint.json'),
      reportFiles: [
        "./workplace-core/**"
      ],
      ignoreLints: [
        "**/*.test.*"
      ],
      async: false
    }),
    new SimpleProgressWebpackPlugin({ // Default options
      format: 'expanded'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.graphql'],
    alias: {
      "@refract-cms/core": path.join(__dirname, "packages", "core", "src"),
      "@refract-cms/dashboard": path.join(__dirname, "packages", "dashboard", "src"),
      "@refract-cms/server": path.join(__dirname, "packages", "server", "src"),
    }
  },
  output: {
    path: path.join(__dirname, ".build"),
    publicPath: "http://localhost:3001/",
    filename: "client.js",
  },
};

module.exports = [
  // {
  //   ...baseConfig,
  //   entry: [
  //     "./workplace-core/index.js",
  //   ],
  //   output: {
  //     path: path.resolve(__dirname, 'workplace-core', 'dist'),
  //     filename: 'index.js',
  //     library: "@refract/workplace-core",
  //     libraryTarget: "umd"
  //   },
  //   name: "core",
  // },
  {
    ...baseConfig,
    entry: [
      "./umbraco/backend/react/main.js",
    ],
    output: {
      path: path.resolve(__dirname, 'umbraco', 'backend', 'dist'),
    },
    name: "umbraco"
  },
  {
    entry: ["reflect-metadata", "@babel/polyfill", "./api/src/server.ts"],
    target: "node",
    mode: 'production',
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
                {
                  modules: false,
                  targets: { "node": "8.10" }
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
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
      // new webpack.NamedModulesPlugin(),
      // new ForkTsCheckerWebpackPlugin({
      //   tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      //   memoryLimit: 2048,
      //   tslint: path.resolve(__dirname, 'tslint.json'),
      //   reportFiles: [
      //     "./api/**",
      //     "./workplace-core/**"
      //   ],
      //   ignoreLints: [
      //     "**/*.test.*"
      //   ],
      //   async: false
      // }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.graphql'],
      alias: {
        "@refract-cms/core": path.join(__dirname, "packages", "core", "src"),
        "@refract-cms/dashboard": path.join(__dirname, "packages", "dashboard", "src"),
        "@refract-cms/server": path.join(__dirname, "packages", "server", "src"),
      }
    },
    output: { path: path.join(__dirname, "api", "dist"), filename: "server.js" },
  }
]