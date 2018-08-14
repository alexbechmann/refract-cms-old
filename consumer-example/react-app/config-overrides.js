const path = require('path');

module.exports = {
  jest: (config) => {
    return config;
  },
  webpack: (config, env) => {
    config.module.rules = [
      ...config.module.rules,
      {
        exclude: /node_modules/,
        loader: 'prettier-loader',
        test: /\.(tsx|ts)?$/,
        enforce: "pre"
      }
    ]
    return config;
  }
}