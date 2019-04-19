const express = require("express");

const app = express();

app.get("*", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

module.exports = app;
