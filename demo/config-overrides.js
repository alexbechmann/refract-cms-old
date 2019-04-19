const path = require("path");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      "@refract-cms/dashboard": path.join(
        __dirname,
        "../packages",
        "dashboard",
        "src"
      ),
      "@refract-cms/core": path.join(__dirname, "../packages", "core", "src"),
      "@refract-cms/server": path.join(
        __dirname,
        "../packages",
        "server",
        "src"
      )
    }
  };
  return config;
};
