import { GraphQLObjectType } from 'graphql';

const MenuNode = new GraphQLObjectType({
  name: 'menu',
  fields: () => ({
    children: { type: MenuNode }
  })
});

function composeSchema<T>(fields: {
  alias: string;
  properties: () => {
    [K in keyof T]: {
      type: any;
    }
  };
}) {
  return {
    gql: new GraphQLObjectType({
      name: 'menu',
      fields: () => ({
        children: { type: MenuNode }
      })
    }),
    mongoose: {}
  };
}

const Page = composeSchema({
  alias: 'page',
  properties: () => ({
    title: {
      type: String
    },
    children: {
      type: [Page]
    }
  })
});

console.log(Page);
