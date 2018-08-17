# Refract-CMS

Refract-CMS allows you to build a frontend first, code first, headless CMS using React, Express & MongoDB.

## Stack

### Frontend
Unlike most other CMS systems, the models are defined in a React SPA, rather than the Backend. The SPA defines the schema & renders the Content Manager "Admin" Component. 

You can host a seperate React app for the CMS frontend, or add it to a route on your existing React app.

Property editors for each property on the entity model are added to the schema here, allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own.


### Technologies
* React
* Typescript (optional)


### Server
The backend server hosts the API endpoints & handles authentication.

### Technologies
* Node
* Express
* MongoDB
* Typescript (optional)

## Getting started (TypeScript)

### Frontend
```
create-react-app frontend --scripts-version=react-scripts-ts
cd ./frontend
npm i -S @refract-cms/core
```

`Create file: news-article.model.ts`
```ts
import { Location, Entity}  from '@refract-cms/core';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  category: string;
  location: Location;
}
```

`Create file: news-article.schema.tsx`
```tsx
import * as React from 'react';
import { defineEntity, TextEditor, EntityPickerEditor } from '@refract-cms/core';
import { NewsArticle } from './news-article.model';

export default defineEntity<NewsArticle>({
  alias: 'newsArticle',
  displayName: 'News Article',
  instanceDisplayName: newsArticle => newsArticle.title
})({
  title: {
    displayName: 'Headline',
    editorComponent: TextEditor({
      maxLength: 100
    }),
    defaultValue: 'default headline'
  },
  articleText: {
    displayName: 'Article text',
    editorComponent: TextEditor({
      maxLength: 100,
      multiline: true
    }),
    defaultValue: ''
  },
  relevantProductsIds: {
    displayName: 'Relevant Products',
    editorComponent: EntityPickerEditor({
      entityAlias: 'product',
      max: 4
    })
  },
  extraText: {
    displayName: 'Extra text',
    editorComponent: props => <input value={props.value} onChange={e => props.setValue(e.target.value)} /> 
    // This is a bare bones custom component at it's most basic level.
  }
});

```


`Edit index.tsx`
```ts
import { configureRefractCms, Admin } from '@refract-cms/core';
import newsArticleSchema from './news-article.schema';

configureRefractCms({
  schema: [newsArticleSchema],
  serverUrl: '##YOUR_SERVER_URL##'
});
```
#### Render Admin dashboard (Option A)
`Edit index.tsx`
```tsx
ReactDOM.render(<Admin />, document.getElementById('root') as HTMLElement);
```
---
# OR

#### Render Admin dashboard existing app (Option B)
Use this if you would like to host the CMS dashboard on the same app as your frontend, mostly for convenience. For larger apps, we recommend hosting this seperately. (Option A).

NB:
* It is entirely possible to start with option B, and move to option A at a later date, or even both.
* Currently only supports use with `react-router` package for routing.

`Edit index.tsx`
```tsx
// ...other imports...
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`/`} exact component={App} />
      <Route path={`/admin`} component={Admin} />
    </Switch>
  </BrowserRouter>
)
ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
```


See next section for details on setting up `YOUR_SERVER_URL`.

### Server
```
mkdir server
cd server
npm init
npm i -S express @refract-cms/server
npm i -D @types/express
```

`Create file index.ts`
```ts
import * as express from 'express';
import { refractCmsRouter } from '@refract-cms/server';

const app = express();
app.use('/my-cms-route', refractCmsRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

### Run your new CMS
Replace `##YOUR_SERVER_URL##` in frontend guide with `http://localhost:3500/my-cms-route`, changing `localhost`, `3500` & `your-cms-route` as neccessary.

Start frontend and server projects.

## Getting started (JavaScript) 
Coming soon...