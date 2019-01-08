# Refract-CMS
Refract-CMS allows you to build a code first, self hosted headless CMS using React, Express & MongoDB.

## Stack
Unlike most other CMS systems, the models & fields are declared in Typescript/Javascript, and do not require you to create them manually in a GUI.

This allows you to properly version control the schema & deploy different versions to staging/production etc.

Editor components for each field are react components, and are defined as part of the schema. You can choose between some of the in-built editors (TextBox, Select, Image) or to write your own.

### Frontend
* React
* Typescript or Javascript

### Server
* Node
* Express
* MongoDB
* Typescript or Javascript

## Quick Start (TypeScript)

### Schema Config
Configuration code should be shared between your frontend and backend.

`shared/news-article.schema.tsx`
```tsx
import React from 'react';
import {
  Entity,
  defineEntity,
  createTextEditor,
  createDatePickerEditor,
  createPropertyEditorProps,
  createImagePickerEditor,
  RefractTypes
} from '@refract-cms/core';

interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  category: string[];
}

const NewsArticleSchema = defineEntity<NewsArticle>({
  options: {
    alias: 'newsArticle',
    displayName: 'News Article'
  },
  properties: {
    title: {
      displayName: 'Headline',
      type: RefractTypes.string,
      editorComponent: createTextEditor({
        maxLength: 100
      }),
      defaultValue: 'default headline'
    },
    articleDate: {
      displayName: 'Article Date',
      type: RefractTypes.date,
      editorComponent: createDatePickerEditor(),
      defaultValue: new Date()
    },
    articleText: {
      displayName: 'Article text',
      type: RefractTypes.string,
      editorComponent: (props: PropertyEditorProps<string>) => <input value={props.value} onChange={e => props.setValue(e.target.value)} /> 
      // This is a bare bones custom component at it's most basic level
    },
    category: {
      displayName: 'Categories',
      editorComponent: createMultipleDropdownEditor({
        selectOptions: ['Sports', 'Global', 'Weather']
      }),
      type: RefractTypes.arrayOf(RefractTypes.string)
    }
  }
})
```

`shared/refract-cms.config.tsx`
```tsx
import React from 'react';
import { configure } from '@refract-cms/core';
import { NewsArticleSchema } from './news-article.schema';

export const config = configure({
  schema: [NewsArticleSchema] // Add all your schema's here.
});
```

### Backend (Express)
```ts
import express from 'express';
import { refractCmsHandler } from '@refract-cms/server';
import { config } from './shared/refract-cms.config.tsx';

const app = express();
const PORT = process.env.PORT || 3000

app.use(
  ...refractCmsHandler({
    rootPath: '/cms', // API's become available on /cms/...
    config,
    serverConfig: {
      mongoConnectionString: 'YOUR_MONGO_CONNECTION_STRING_HERE'
      filesPath: 'files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'YOUR_ADMIN_PASSWORD'
        },
        jwt: {
          issuer: 'ryomtand',
          secret: 'JWT_SECRET' // You should use a different secret per environment/app
        }
      }
    }
  })
)

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

```
### Frontend (React)
You can render the admin dashboard on your chosen route, alongside the rest of your app and hook it up to your server.
```tsx
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createDashboard } from '@refract-cms/dashboard';
import { config } from './shared/refract-cms.config.tsx';
import News from './News';

render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={createDashboard({ config, serverUrl: 'http://YOUR_SERVER.com/cms' })} />
      <Route path="/" component={News} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
```
You can also render the dashboard directly, for example if you choose to host the CMS frontend on its own app.
```tsx
render(
  createDashboard({ config, serverUrl: 'http://YOUR_SERVER.com/cms' })
  document.getElementById('root')
);
```

News Component (Consuming the graphql api)
```tsx
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const link = new HttpLink({ uri: `http://YOUR_SERVER.com/cms/graphql` });

const cache = new InMemoryCache({
  addTypename: false
});

const apolloClient = new ApolloClient({
  link,
  cache
});


const NEWS_QUERY = gql`
  {
    news: newsArticleMany(sort: TITLE_ASC, limit: 5) {
      _id
      title
      articleText
      articleDate
      category
    }
  }
`;

const News = () => (
  <ApolloProvider client={apolloClient}>
    <Query query={NEWS_QUERY}>
      {({ loading, error, data }) => (
        <div>
          {loading ? (
            <p>Loading</p>
          ) : (
            <div>
              <h1>News</h1>
              <ul>
                {data.news.map(article => {
                  return (
                    <li key={article._id}>
                      {article.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </Query>
  </ApolloProvider>
);

export default News;

```