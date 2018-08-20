import * as express from 'express';
import * as refract from '@refract-cms/server';

refract.configure({
  mongoConnectionString: 'mongodb://localhost:27018/refract-playground-server'
});

const app = express();
app.use(refract.router); 

const port = process.env.PORT || 3500; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});