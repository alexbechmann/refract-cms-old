const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk").default;
const shell = require("shelljs");
const ora = require("ora");
const spawn = require("child_process").spawn;

module.exports = function(name) {
  const appDir = path.resolve(process.cwd(), name);

  const npmInstall = () => {
    return new Promise((resolve, reject) => {
      var process = spawn("npm install", { shell: true, cwd: appDir });

      spinner.start();
      process.on("exit", () => {
        resolve();
      });
    });
  };

  console.log("Creating a new app in " + appDir);
  fs.ensureDirSync(name);
  fs.copySync(
    path.join(__dirname, "../new-source-files"),
    path.join(process.cwd(), name)
  );
  console.log("Created app in " + chalk.blue(appDir));

  const spinner = ora({
    text: "Installing dependencies",
    spinner: "dots10"
  }).start();
  npmInstall().then(() => {
    spinner.stop();
    console.log("--------");
    console.log(chalk.yellow("cd " + name));
    console.log(chalk.yellow("docker-compose up -d"));
    console.log(chalk.yellow("npm start"));
    console.log("--------");
    process.exit();
  });
};
