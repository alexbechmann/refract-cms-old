const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk").default;
const shell = require("shelljs");

module.exports = function(name) {
  const appDir = path.resolve(process.cwd(), name);

  console.log("Creating a new app in " + appDir);
  fs.ensureDirSync(name);
  fs.copySync(
    path.join(__dirname, "../new-source-files"),
    path.join(process.cwd(), name)
  );
  console.log("Created app in " + chalk.blue(appDir));
  console.log("Installing dependencies...");
  shell.cd(appDir);
  shell.exec("npm install");
  console.log("cd " + name);
  console.log("docker-compose up -d");
  console.log("npm start");
  process.exit();
};
