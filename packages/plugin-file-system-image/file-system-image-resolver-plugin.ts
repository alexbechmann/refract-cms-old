import { createResolverPlugin } from '@refract-cms/server';
import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

// const fileSystemImageType = new GraphQLObjectType({
//   name: 'FileSystemImage',
//   fields: () => ({

//   })
// })

export default createResolverPlugin({
  alias: 'fileSystemImage',
  buildFieldConfig: args => {
    return {
      type: GraphQLString,
      name: 'FileSystemImage',
      args: {
        height: { type: GraphQLInt }
      },
      resolve: source => {
        return source[args.propertyKey];
      }
    };
  }
});
