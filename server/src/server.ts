import * as express from 'express';

const app = express();

app.post('/content/:alias/:id?', (req, res) => {
  console.log('hi2');
})

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
