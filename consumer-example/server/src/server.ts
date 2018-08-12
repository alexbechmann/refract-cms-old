import * as express from 'express';
import { firestoreCmsRouter } from '@firestore-cms/server';

const app = express();

app.use('/cms', firestoreCmsRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
