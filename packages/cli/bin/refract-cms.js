#! /usr/bin/env node
"use strict";

const program = require("commander");

program
  .command("start")
  .description("start")
  .action(function() {
    require("../scripts/start");
  });

program
  .command("build")
  .description("build")
  .action(function() {
    require("../scripts/build");
  });

program
  .command("create [name]")
  .description("create new app")
  // .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(name, options) {
    const create = require("../scripts/create");
    create(name);
  });

program.parse(process.argv);
