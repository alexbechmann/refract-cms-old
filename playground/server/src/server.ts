import * as express from 'express';
import * as refract from '@refract-cms/server';
import { Entity } from '@refract-cms/core';
import { GraphQLString } from 'graphql';

interface NewsArticle extends Entity {
  title: string;
}

const NewsSchema = refract.defineEntity<NewsArticle>({
  alias: 'newsArticle',
  displayName: 'News Article'
})({
  title: {
    type: GraphQLString
  } 
})

refract.configure({
  mongoConnectionString: 'mongodb://localhost:27018/refract-playground-server',
  schema: [NewsSchema]
});

console.log(refract.buildRouter('cms') )

const app = express();
app.use(
  ...refract.buildRouter('/cms') as any
);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});