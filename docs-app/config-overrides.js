const path = require('path');

module.exports = {
  jest: (config) => {
    config.modulePaths = ['src/'];
    return config;
  },
  webpack: (config, env) => {
    config.resolve.alias.src = path.resolve(__dirname, './src/');
    config.module.rules.push({
      exclude: /node_modules/,
      loader: 'prettier-loader',
      test: /\.(tsx|ts)?$/
    })
    return config;
  }
}