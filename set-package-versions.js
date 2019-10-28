var program = require("commander");
const path = require("path");
const fs = require("fs");
const { produce } = require("immer");

program
  .option("-p, --package-version [type]", "GitVersion")
  .option("--dry-run")
  .parse(process.argv);

const { packageVersion, dryRun } = program;
const dependencyPackageVersion = `^${packageVersion}`;

console.log({ packageVersion, dryRun });
const rootDir = path.resolve(__dirname, "packages");

let dirs = ["create-app/new-source-files"];
for (const file of fs.readdirSync(rootDir)) {
  if (
    fs.statSync(path.join(rootDir, file)).isDirectory() &&
    fs.existsSync(path.join(rootDir, file, "package.json"))
  ) {
    dirs = [...dirs, file];
  }
}

console.log({ dirs });
dirs.forEach(dir => {
  const packageJsonPath = path.resolve(
    __dirname,
    "packages",
    dir,
    "package.json"
  );
  /**
   * @type {any}
   */
  const packageJsonData = fs.readFileSync(packageJsonPath);
  const packageJsonContents = JSON.parse(packageJsonData);
  const newPackageJsonContents = produce(
    packageJsonContents,
    newPackageJson => {
      newPackageJson.version = packageVersion;
      for (const key in newPackageJson.dependencies) {
        if (key.indexOf("@refract-cms") > -1) {
          newPackageJson.dependencies[key] = dependencyPackageVersion;
          newPackageJson.peerDependencies[key] = dependencyPackageVersion;
        }
      }
      for (const key in newPackageJson.devDependencies) {
        if (key.indexOf("@refract-cms") > -1) {
          newPackageJson.devDependencies[key] = dependencyPackageVersion;
          newPackageJson.peerDependencies[key] = dependencyPackageVersion;
        }
      }
      for (const key in newPackageJson.peerDependencies) {
        if (key.indexOf("@refract-cms") > -1) {
          newPackageJson.peerDependencies[key] = dependencyPackageVersion;
        }
      }
    }
  );
  console.log(
    `Setting package version ${packageVersion} for file: ${packageJsonPath}`,
    newPackageJsonContents
  );
  if (!dryRun) {
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(newPackageJsonContents, null, 2)
    );
  }
});
