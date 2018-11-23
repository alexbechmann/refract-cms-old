import * as express from 'express';
import * as refract from '.';

refract.configure({
  mongoConnectionString: process.env.MONGO_URL || 'mongodb://mongo:27017/refract',
  adminCredentials: {
    password: process.env.ADMIN_PASSWORD
  },
  auth: {
    tokenSecret: 'tokenSecret'
  }
});

const app = express();
app.use(refract.router);
app.use('/', (req, res) => {
  res.send('Refract-CMS')
});

const port = 3500;
app.listen(port, () => {
  console.log(`Refract-CMS Server listening on port ${port}`);
});
