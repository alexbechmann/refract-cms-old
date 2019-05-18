#! /usr/bin/env node
"use strict";

const create = require("../scripts/create");
var args = process.argv.slice(2);

const name = args[0];

if (!name) {
  console.log("Must provide name argument.");
} else {
  create(name);
}
