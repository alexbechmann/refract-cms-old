// /util/app.js
const app = require("express")();

app.set("trust proxy", 1);

module.exports = app;
