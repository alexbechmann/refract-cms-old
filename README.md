# Firestore-CMS

Firestore-CMS allows you to build a frontend first, code first, headless CMS using React, Express & MongoDB.

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
npm i -S @firestore-cms/core
```

`Create file: news-article.model.ts`
```tsx
import { defineEntity, TextEditor, Location, Entity, LocationEditor, SingleDropdownEditor } from '@firestore-cms/core';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  category: string;
  location: Location;
}

export default defineEntity<NewsArticle>({
  alias: 'newsArticle',
  displayName: 'News Article'
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
  category: {
    displayName: 'Category',
    editorComponent: SingleDropdownEditor({
      selectOptions: ['Electronics', 'Food']
    })
  },
  location: {
    displayName: 'Location',
    editorComponent: LocationEditor
  }
});
```

`Edit index.tsx`
```ts
import { configureFirestoreCms } from '@firestore-cms/core';
import NewsArticle from './news/news-article.model';

configureFirestoreCms({
  schema: [NewsArticle],
  serverUrl: '##YOUR_SERVER_URL##'
});
```

`Edit App.tsx`
```tsx
import * as React from 'react';
import { Admin } from '@firestore-cms/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MyHomePage from './MyHomePage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path={`/`} exact component={MyHomePage} />
            <Route path={`/admin`} component={Admin} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;


```

See next section for details on setting up `YOUR_SERVER_URL`.

### Server
```
mkdir server
cd server
npm init
npm i -S express @firestore-cms/server
npm i -D @types/express
```

`Create file index.ts`
```ts
import * as express from 'express';
import { firestoreCmsRouter } from '@firestore-cms/server';

const app = express();
app.use('/my-cms-route', firestoreCmsRouter);

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