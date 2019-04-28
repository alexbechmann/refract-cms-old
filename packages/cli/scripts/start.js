process.env.NODE_ENV = "development";
const fs = require("fs");
const webpack = require("webpack");
const {
  createServerConfig,
  createClientConfig
} = require("../config/create-config");
const devServer = require("webpack-dev-server");

process.noDeprecation = true; // turns off that loadQuery clutter.

// Capture any --inspect or --inspect-brk flags (with optional values) so that we
// can pass them when we invoke nodejs
process.env.INSPECT_BRK =
  process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || "";
process.env.INSPECT =
  process.argv.find(arg => arg.match(/--inspect(=|$)/)) || "";

function main() {
  console.info("Compiling...");

  let clientConfig = createClientConfig();
  let serverConfig = createServerConfig();

  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  serverCompiler.watch(
    {
      stats: "errors-only"
    },
    /* eslint-disable no-unused-vars */
    stats => {}
  );

  const clientDevServer = new devServer(clientCompiler, clientConfig.devServer);
  clientDevServer.listen(3001, err => {
    if (err) {
      console.error(err);
    }
  });
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.error("Failed to compile.", [e]);
    // process.exit(1);
  }
  return compiler;
}

main();
