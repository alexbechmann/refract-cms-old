# Refract-CMS Core

## Quick Start (TypeScript)

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
  serverUrl: '##YOUR_SERVER_URL##' // See server package: https://www.npmjs.com/package/@refract-cms/server
});

```
#### Render Admin dashboard
`Edit index.tsx`
```tsx
ReactDOM.render(<refract.Admin />, document.getElementById('root') as HTMLElement);
```