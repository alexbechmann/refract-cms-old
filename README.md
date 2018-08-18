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

## Quick Start (TypeScript)

### Frontend
```
npm i -g create-react-app
create-react-app frontend --scripts-version=react-scripts-ts
cd ./frontend
npm i -S @refract-cms/core
```

`Create file: news-article.model.ts`
```ts
import { Entity }  from '@refract-cms/core';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  category: string;
  articleDate: Date;
  relevantProductsIds: string[];
}
```

`Create file: news-article.schema.tsx`
```tsx
import * as React from 'react';
import { defineEntity, TextEditor, EntityPickerEditor, DatePickerEditor } from '@refract-cms/core';
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
  },
  articleDate: {
    displayName: 'Article date',
    editorComponent: DatePickerEditor()
  }
});

```

`Edit index.tsx`
```tsx
import * as refract from '@refract-cms/core';
import newsArticleSchema from './news-article.schema';

refract.configure({
  schema: [newsArticleSchema],
  serverUrl: '##YOUR_SERVER_URL##' // See server section below
});

```
#### Render Admin dashboard
`Edit index.tsx`
```tsx
ReactDOM.render(<refract.Admin />, document.getElementById('root') as HTMLElement);
```
NB: See [USING_CUSTOM_ROUTER](docs/USING_CUSTOM_ROUTER.md) for how to add to a route on your existing react app


### Server
```
mkdir server
cd server
npm init
npm i -S express @refract-cms/server
```

`Create file index.ts`
```ts
import * as express from 'express';
import * as refract from '@refract-cms/server';

refract.configure({
  mongoConnectionString: '##YOUR_MONGO_URL##'
});

const app = express();
app.use(refract.router); 

const port = process.env.PORT || 3500; 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

### Run your new CMS
Replace `##YOUR_SERVER_URL##` in frontend guide with `http://localhost:3500` (If using this example).

Start frontend and server projects.

## Getting started (JavaScript) 
Coming soon...