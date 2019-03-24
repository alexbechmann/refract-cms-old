---
path: "/quick-start"
title: Quick Start
---

# Server

```
npm install --save express @refract-cms/core @refract-cms/server
```

### news-article.entity.ts

This interface describes the data entity that will be editable in the CMS & stored in this format in the database.

```ts
import { Entity, ImageRef } from "@refract-cms/core";

export interface NewsArticleEntity extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  image: ImageRef<"profile" | "large">;
  highlighted: boolean;
}
```

### refract-config.tsx

```tsx
import { configure, FileSchema } from "@refract-cms/core";
import { NewsArticleSchema } from "./news-article.schema";

export default configure({
  schema: [NewsArticleSchema, FileSchema]
});
```

### server.ts

### news-article.model.tsx

This interface describes the data model that will be publically queryable in the GraphQL endpoint. You will resolve this interface on the server from the original enitity.

```ts
import { Entity, ImageModel } from "@refract-cms/core";

export interface NewsArticleModel extends Entity {
  title: string;
  articleText: string;
  articleDate: Date;
  image: ImageModel<"profile" | "large">;
  highlighted: boolean;
}
```

### server.ts

```ts
import express from "express";
import {
  refractCmsHandler,
  createPublicSchema,
  resolveImageProperty,
  ImageModel
} from "@refract-cms/server";
import config from "../refract-cms/refract.config";

const app = express();

app.use(
  ...refractCmsHandler({
    rootPath: "/cms",
    config,
    serverConfig: {
      mongoConnectionString: process.ENV.MONGO_URI,
      filesPath: "consumer/files/",
      auth: {
        adminCredentials: {
          username: "admin",
          password: "pw"
        },
        jwt: {
          issuer: "consumer",
          secret: "secret"
        }
      },
      publicGraphql: [
        createPublicSchema<Product, { someVar: string }>(ProductSchema, {
          ...ProductSchema.properties,
          someVar: {
            type: RefractTypes.string,
            resolve: product => `${product._id}_hello!`
          }
        }),
        createPublicSchema<
          NewsArticle,
          { image: ImageModel<"profile" | "large">; title: string }
        >(NewsArticleSchema, {
          image: resolveImageProperty(
            NewsArticleSchema.properties.image,
            article => article.image
          ),
          title: {
            type: RefractTypes.string,
            resolve: article => article.title
          }
        })
      ]
    }
  })
);
```
