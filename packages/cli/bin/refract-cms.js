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
  .command("new [name]")
  .description("run setup commands for all envs")
  // .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(name, options) {
    const create = require("../scripts/new");
    create(name);
  });

program.parse(process.argv);
