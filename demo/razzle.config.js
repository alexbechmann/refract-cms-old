"use strict";

const path = require("path");
const babelEnvDeps = require("webpack-babel-env-deps");
const typescript = require("razzle-plugin-typescript");

module.exports = {
  plugins: [],
  modify(config, args, webpack) {
    const { target, dev } = args;
    let appConfig = config;
    if (target === "web") {
      appConfig.module.rules = [
        ...appConfig.module.rules,
        {
          test: /\.(js|jsx)$/,
          loader: "ts-loader",
          exclude: [babelEnvDeps.exclude()],
          options: {
            transpileOnly: true
          }
        }
      ];
      appConfig = typescript(config, args, webpack, {
        useBabel: false,
        useEslint: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve(__dirname, "tsconfig.json")
        },
        forkTsChecker: {
          tsconfig: path.resolve(__dirname, "tsconfig.json"),
          tslint: "./tslint.json",
          watch: "./src",
          typeCheck: true,
          tslintAutoFix: dev
        }
      });
    } else {
      if (!dev) {
        appConfig.optimization = {
          ...appConfig.optimization,
          minimize: false
        };
        appConfig.externals = [];
      }
      appConfig = typescript(config, args, webpack, {
        useBabel: false,
        useEslint: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: path.resolve(__dirname, "tsconfig.server.json")
        },
        forkTsChecker: {
          tsconfig: path.resolve(__dirname, "tsconfig.server.json"),
          tslint: "./tslint.json",
          watch: ["./src"],
          typeCheck: true,
          tslintAutoFix: dev
        }
      });
    }
    if (dev && target === "web") {
      appConfig.plugins = [...appConfig.plugins];
    }
    appConfig.module.rules = [
      ...appConfig.module.rules,
      {
        test: /\.(js|jsx|ts|tsx|css|scss)$/,
        loader: "prettier-loader",
        exclude: /node_modules/
      }
    ];
    appConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: "ts-loader",
      include: [path.resolve(__dirname, "..", "packages")],
      options: {
        transpileOnly: true
      }
    });
    appConfig.resolve = {
      ...appConfig.resolve,
      extensions: appConfig.resolve.extensions.concat([
        ".ts",
        ".tsx",
        ".js",
        ".graphql",
        ".gql"
      ]),
      alias: {
        ...appConfig.resolve.alias,
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
    return appConfig;
  }
};
