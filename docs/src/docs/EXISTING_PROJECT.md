---
path: "/existing-project"
title: Add to an existing project
---

It is recommended that you use a shared codebase between client and server, as they will both need to reference a shared config object.

# Install dependencies

```
npm install --save express @refract-cms/core @refract-cms/server @refract-cms/dashboard
```

# Setup models (Shared between client & server)

### news-article.schema.tsx

```tsx
import React from "react";
import {
  Entity,
  defineEntity,
  RefractTypes,
  ImageRef,
  createTextEditor,
  createDatePickerEditor,
  createImagePickerEditor,
  createSingleEntityPickerEditor,
  createMultipleEntityPickerEditor
} from "@refract-cms/core";
import { NewsArticleEntity } from "./news-article.entity";
import DescriptionIcon from "@material-ui/icons/Description";
import moment from "moment";

// This interface describes the data entity that will be editable in the
// CMS & stored in this format in the database.
export interface NewsArticleEntity extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  extraText: string;
  image: ImageRef<"profile" | "large">;
}

// This interface describes the data model that will be publically queryable in the Graphql endpoint.
// You will resolve this interface on the server from the original enitity.
export interface NewsArticleModel extends NewsArticleEntity {
  imageModel: ImageModel<"profile" | "large">;
}

export const NewsArticleSchema = defineEntity<
  NewsArticleEntity,
  NewsArticleModel
>({
  options: {
    alias: "newsArticle",
    displayName: "News Article",
    instanceDisplayProps: newsArticle => ({
      primaryText: newsArticle.title,
      secondaryText: newsArticle.articleDate
        ? moment(newsArticle.articleDate).format("ll")
        : ""
    }),
    icon: DescriptionIcon,
    defaultSort: {
      orderByDirection: "DESC",
      orderByField: "articleDate"
    }
  },
  properties: {
    title: {
      displayName: "Headline",
      editorComponent: createTextEditor({
        maxLength: 100
      }),
      defaultValue: "default headline",
      type: RefractTypes.string
    },
    articleText: {
      displayName: "Article text",
      editorComponent: createTextEditor({
        maxLength: 100,
        multiline: true
      }),
      defaultValue: "",
      type: RefractTypes.string
    },
    extraText: {
      displayName: "Extra text",
      // Example of a basic custom editor component
      editorComponent: props => (
        <input
          value={props.value}
          onChange={e => props.setValue(e.target.value)}
        />
      ),
      type: RefractTypes.string
    },
    articleDate: {
      displayName: "Article date",
      editorComponent: createDatePickerEditor(),
      type: RefractTypes.date
    },
    image: {
      displayName: "Image",
      editorComponent: createImagePickerEditor({
        cropDefinitions: {
          profile: {
            aspectRatio: 4 / 4
          },
          large: {
            aspectRatio: 16 / 9
          }
        }
      }),
      type: RefractTypes.imageShape({
        profile: RefractTypes.cropShape,
        large: RefractTypes.cropShape
      })
    }
  }
});
```

### refract-config.ts

```typescript
import { configure, FileSchema } from "@refract-cms/core";
import { NewsArticleSchema } from "./news-article.schema";

export default configure({
  schema: [NewsArticleSchema, FileSchema]
});
```

# Server

### server.ts

```typescript
import express from "express";
import {
  refractCmsHandler,
  createPublicSchema,
  resolveImageProperty,
  ImageModel
} from "@refract-cms/server";
import config from "./refract-config";

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: "/cms",
    config,
    serverConfig: {
      mongoConnectionString: process.env.MONGO_URI,
      filesPath: "consumer/files/",
      auth: {
        adminCredentials: {
          username: "admin",
          password: "pw"
        },
        jwt: {
          issuer: "my-app",
          secret: process.env.JWT_SECRET
        }
      },
      publicGraphQL: [
        createPublicSchema(NewsArticleSchema, ({ resolveImageProperty }) => {
          return {
            ...NewsArticleSchema.properties,
            imageModel: resolveImageProperty("image"),
            title: {
              type: RefractTypes.string,
              resolve: ({ title }) => (title ? title.toUpperCase() : "")
            }
          };
        })
      ]
    }
  })
);
```

# Client

### index.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Rest of your app, if you decide to host it on the same server.
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { createDashboard } from "@refract-cms/dashboard";
import config from "./refract.config";
import { render } from "react-dom";

const serverUrl = "/cms"; // Must match "rootPath" from server for refractCmsHandler config

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={createDashboard({ config, serverUrl })} />
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
);

render(<Root />, document.getElementById("app"));
```
