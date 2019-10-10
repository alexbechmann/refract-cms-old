const merge = require("webpack-merge");
const path = require("path");

module.exports = ({ webpackConfig, target }) => {
  return merge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "ts-loader",
          include: [path.resolve(__dirname, "..", "packages")],
          options: {
            transpileOnly: true
          }
        },
        {
          test: /\.(js|jsx|ts|tsx|css|scss)$/,
          loader: 'prettier-loader',
          exclude: /node_modules/
        }
      ]
    },
    // resolve: {
    //   alias: {
    //     "@refract-cms/dashboard": path.join(
    //       __dirname,
    //       "../packages",
    //       "dashboard",
    //       "src"
    //     ),
    //     "@refract-cms/core": path.join(__dirname, "../packages", "core", "src"),
    //     "@refract-cms/server": path.join(
    //       __dirname,
    //       "../packages",
    //       "server",
    //       "src"
    //     ),
    //     "@refract-cms/plugin-code-gen": path.join(
    //       __dirname,
    //       "../packages",
    //       "plugin-code-gen",
    //       "src"
    //     ),
    //     "@refract-cms/plugin-active-directory-auth": path.join(
    //       __dirname,
    //       "../packages",
    //       "plugin-active-directory-auth",
    //       "src"
    //     ),
    //     "@refract-cms/plugin-file-system-image": path.join(
    //       __dirname,
    //       "../packages",
    //       "plugin-file-system-image",
    //       "src"
    //     )
    //   }
    // }
  });
};
