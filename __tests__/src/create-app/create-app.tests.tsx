// import React from 'react';
// import fs from 'fs';
// import mocha from 'mocha';
// import chai from 'chai';
// import shell from 'shelljs';
// import path from 'path';

// const expect = chai.expect;
// const testAppFilesPath = path.resolve(__dirname, 'create-app-files');

// mocha.describe('property types', () => {
//   mocha.it('1', async () => {
//     // await create('test-create');
//     await shell.exec(
//       `node ${path.resolve(__dirname, '../../../packages/create-app/bin/create-refract-cms-app.js')} create-app-files`
//     );
//     shell.cd(testAppFilesPath);
//     shell.exec('ls');
//   });
// });

// after(async () => {
//   fs.rmdirSync(testAppFilesPath);
// });
