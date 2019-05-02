#! /usr/bin/env node
"use strict";

// const spawn = require("cross-spawn");
// var stream = require("stream");
// const child_process = require("child_process");

// // const result = spawn.sync("node", [require.resolve("../scripts/" + "start")], {
// //   stdio: "inherit",
// //   killSignal: "SIGINT"
// // });
// // if (result.signal) {
// //   if (result.signal === "SIGKILL") {
// //     console.log(
// //       "The build failed because the process exited too early. " +
// //         "This probably means the system ran out of memory or someone called " +
// //         "`kill -9` on the process."
// //     );
// //   } else if (result.signal === "SIGTERM") {
// //     console.log(
// //       "The build failed because the process exited too early. " +
// //         "Someone might have called `kill` or `killall`, or the system could " +
// //         "be shutting down."
// //     );
// //   }
// //   process.exit(1);
// // }
// // process.exit(result.status);

// if (process.platform === "win32") {
//   var rl = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.on("SIGINT", function() {
//     process.emit("SIGINT");
//   });

//   rl.on("line", line => {
//     console.log("received" + line);
//     var stdinStream = new stream.Readable();
//     stdinStream.push(line); // Add data to the internal queue for users of the stream to consume
//     stdinStream.push(null); // Signals the end of the stream (EOF)
//     stdinStream.pipe(process.stdin);
//   });
// }

// process.on("SIGINT", function() {
//   console.log("exiting...");
//   process.exit();
// });

// var r = child_process.spawnSync("somecommand", ["arg1", "arg2"], {

// });

// // const result = spawn.sync("node", [require.resolve("../scripts/" + "start")], {
// //   input: process.stdin,
// //   stdio: "inherit",
// //   killSignal: "SIGINT"
// // });

require("../scripts/start");
