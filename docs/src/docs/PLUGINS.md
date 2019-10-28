---
path: "/plugins"
title: Plugins
order: 6
---

## File System Image

This will allow you to upload images & pick them from your schemas. It adds has a image processor to your server and the ability to query for cropped images in GraphQL.

### Installation

```
npm install --save @refract-cms/plugin-file-system-image
```

Add Schema to your `refract.config.tsx`

```tsx
import { FileSystemImageSchema } from "@refract-cms/plugin-file-system-image";
// ... rest of imports

export default configureCli({
  schema: [
    // rest of your schemas
    FileSystemImageSchema
  ]
  // ... rest of config
});
```

Add server plugin to `server.config.ts`

```tsx
import { fileSystemImageServerPlugin } from "@refract-cms/plugin-file-system-image/dist/server";

export default configureCliServer({
  // rest of config
  plugins: [
    // rest of your plugins
    fileSystemImageServerPlugin({
      filesPath: "files/" // path is relative to root dir containing package.json
    })
  ]
});
```

## Code gen

This will generate typescript interfaces for all schemas & allow you to write queries that will generate react hooks for apollo to be consumed by a frontend project.

### Installation

```
npm install --save @refract-cms/plugin-file-system-image
```

Add Schema to your `refract.config.tsx`

```tsx
// ... rest of imports
import { FileSystemImageSchema } from "@refract-cms/plugin-file-system-image";

export default configureCli({
  schema: [
    // rest of your schemas
    FileSystemImageSchema
  ]
  // ... rest of config
});
```

Add server plugin to `server.config.ts`

This example assumes you used the "blog" starter for the query. If you didn't use this starter, replace `authorList` with any query that makes sense in your project.

```tsx
// ... rest of imports
import { codeGenServerPlugin } from "@refract-cms/plugin-code-gen/dist/server";
import path from "path";
import gql from "graphql-tag";

export default configureCliServer({
  // rest of config
  plugins: [
    // rest of your plugins
    codeGenServerPlugin({
      outputPath: path.resolve(process.cwd(), "generated"),
      queries: [
        gql`
          query allAuthors {
            authorList {
              _id
            }
          }
        `
      ]
    })
  ]
});
```

Then in your frontend project

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import introspectionResult from "../path/to/generated/introspect.generated.json";
import { useAllAuthorsQuery } from "../path/to/generated";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql"
});
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});
const cache = new InMemoryCache({
  addTypename: true,
  fragmentMatcher
});
return new ApolloClient({
  link,
  cache
});

function Authors() {
  const { data, error, loading } = useAllAuthorsQuery();
  if (error) {
    return <p>Something went wrong!</p>;
  } else if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {data.authorList.map(author => {
        return (
          <p>
            {author.lastName}, {author.firstName}
          </p>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={apollo}>
      <Authors />
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```
