import { setupExpress } from '@headless-cms/server';
import * as express from 'express';

const app = express();

setupExpress(app);
app.listen(3300, () => console.log('Example app listening on port 3300!'))