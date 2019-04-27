process.env.NODE_ENV = "development";
const fs = require("fs");
const webpack = require("webpack");
const {
  createServerConfig,
  createClientConfig
} = require("../config/create-config");
const devServer = require("webpack-dev-server");
const MemoryFS = require("memory-fs");
var memoryFS = new MemoryFS();

process.noDeprecation = true; // turns off that loadQuery clutter.

// Capture any --inspect or --inspect-brk flags (with optional values) so that we
// can pass them when we invoke nodejs
process.env.INSPECT_BRK =
  process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || "";
process.env.INSPECT =
  process.argv.find(arg => arg.match(/--inspect(=|$)/)) || "";

function main() {
  // Optimistically, we make the console look exactly like the output of our
  // FriendlyErrorsPlugin during compilation, so the user has immediate feedback.
  // clearConsole();
  console.info("Compiling...");

  // // Check for razzle.config.js file
  // if (fs.existsSync(paths.appRazzleConfig)) {
  //   try {
  //     razzle = require(paths.appRazzleConfig);
  //   } catch (e) {
  //     clearConsole();
  //     console.error('Invalid razzle.config.js file.', e);
  //     process.exit(1);
  //   }
  // }

  // Delete assets.json to always have a manifest up to date
  // fs.removeSync(paths.appManifest);

  // Create dev configs using our config factory, passing in razzle file as
  // options.
  let clientConfig = createClientConfig();
  let serverConfig = createServerConfig();

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);
  // serverCompiler.outputFileSystem = memoryFS;

  // Instatiate a variable to track server watching
  let watching;

  // Start our server webpack instance in watch mode after assets compile
  clientCompiler.plugin("done", () => {
    // If we've already started the server watcher, bail early.
    if (watching) {
      return;
    }
    // Otherwise, create a new watcher for our server code.
    watching = serverCompiler.watch(
      {
        quiet: true,
        stats: "none"
      },
      /* eslint-disable no-unused-vars */
      stats => {}
    );
  });

  // Create a new instance of Webpack-dev-server for our client assets.
  // This will actually run on a different port than the users app.
  const clientDevServer = new devServer(clientCompiler, clientConfig.devServer);

  // Start Webpack-dev-server
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
    process.exit(1);
  }
  return compiler;
}

// setPorts()
//   .then(main)
//   .catch(console.error);

main();
