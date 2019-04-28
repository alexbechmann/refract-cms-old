import express from 'express';
import chalk from 'chalk';

// this require is necessary for server HMR to recover from error
// tslint:disable-next-line:no-var-requires
let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
    console.log(`Dashboard: ${chalk.green('http://localhost:3000')}`);
    console.log(`GraphiQL: ${chalk.green('http://localhost:3000/cms/public/graphql')}`);
    console.log(`GraphQL Playground: ${chalk.green('http://localhost:3000/cms/public/graphql-playground')}`);
  });
