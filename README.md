## What is Refract-CMS?

Refract-CMS is an open source, code first, self-hosted headless CMS using React, Express & MongoDB.

## How is it different from other CMS's?

Unlike most other CMS systems, the schema is defined in JavaScript/TypeScript, and we do not force developers to use elaborate GUI's.

Developers can live entirely in their chosen code editor, while content editors can utilize a blazing fast React based single-page-app, to manage content.

Content management systems were originally developed to help non-developers create content for websites without writing code. It appears that many modern CMS systems unnecessarily try to protect developers from writing code aswell, requiring developers to use elaborate GUI's, and then afterwards going into code and writing classes anyway in their chosen frontend.

This approach has some advantages:

- It allows teams to properly code-review schema changes using their current git workflows.
- Your schema's can be copy/pasted between projects, or distributed using your organizations private NPM registry etc.
- Your schema can be deployed to multiple environments without requiring you to do duplicate work in a GUI or database imports, You just deploy the code and start editing.
- Clean database, Refract-CMS only creates one mongo collection per schema, as it doesn't have to store schema information in there.

## GraphQL

The express middleware generates exposes a GraphQL endpoint based on your schema. You are able to extend/override the resolvers if you would like to perform any server side logic or model mutations on the server.

A common example of this is a reference to another entity type.

Image this example, you have two schemas: Product & Product category, Product can pick many many Product categories.
E.g. The database representation of a product would have a list of productCategoryIds. This can be resolved on the server to return the corresponding schema and fully utilize the power of GraphQL.

![](./assets/graphql-screenshot.png)

## Customization

Property editors for each property on the entity model are added to the schema here, allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own.

## Hosting

You are responsible for:

- Serving an express app using the Refract-CMS express middleware.
- React editor dashboard.

You are free to choose how to do this. We recommend deploying a razzle universal app to heroku or dokku.

Guides coming soon...
