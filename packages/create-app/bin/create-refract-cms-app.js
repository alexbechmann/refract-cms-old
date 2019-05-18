#! /usr/bin/env node
"use strict";

const program = require("commander");

program
  .command("create [name]")
  .description("create new app")
  .action(function(name, options) {
    const create = require("../scripts/create");
    create(name);
  });

program.parse(process.argv);
