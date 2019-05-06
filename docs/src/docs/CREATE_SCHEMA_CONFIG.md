---
path: "/create-schema-config"
title: Create schema config
order: 2
---

# Setup Refract-CMS Schema config

Create file: `news-article.schema.tsx`

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

-- refract-config.ts

Add your new schema to the refract-config.

```typescript
...
import { NewsArticleSchema } from "./news-article.schema";

export default configure({
  schema: [
    NewsArticleSchema
    // The rest of your schemas
  ]
});
```

### Server Config

Optionally add a createPublicSchema function to change the shape of the response data.

-- server-config.tsx

```typescript
...
import { ServerConfig, createPublicSchema } from "@refract-cms/server";
import { NewsArticleSchema } from "./news-article.schema";

const serverConfig: ServerConfig = {
  ...
  publicGraphQL: [
    createPublicSchema(NewsArticleSchema, ({ helpers }) => {
      return {
        ...NewsArticleSchema.properties,
        imageModel: helpers.resolveImageProperty("image"),
        title: {
          type: RefractTypes.string,
          resolve: ({ title }) => (title ? title.toUpperCase() : "")
        }
      };
      // The rest of your createPublicSchema functions
    })
  ]
};

export default serverConfig;
```
