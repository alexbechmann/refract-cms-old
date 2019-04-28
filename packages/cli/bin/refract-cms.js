#! /usr/bin/env node
"use strict";

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function() {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function() {
  //graceful shutdown
  process.exit();
});

require("../scripts/start");
