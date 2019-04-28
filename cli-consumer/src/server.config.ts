import { ServerConfig } from '@refract-cms/server';
import config from './refract.config';

export default () =>
  new Promise<ServerConfig>(async resolve => {
    resolve({
      config,
      rootPath: '/cms',
      mongoConnectionString: 'mongodb://localhost:27018/cli-consumer',
      filesPath: 'files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret1'
        }
      },
      publicGraphQL: [
        // createPublicSchema(ProductSchema, () => {
        //   return {
        //     ...ProductSchema.properties,
        //     someVar: {
        //       type: RefractTypes.string,
        //       resolve: product => `${product._id}_hello!`
        //     }
        //   };
        // }),
        // createPublicSchema(
        //   NewsArticleSchema,
        //   ({ resolveImageProperty, schema, resolveReference, resolveReferences }) => {
        //     return {
        //       ...schema.properties,
        //       imageModel: resolveImageProperty('image'),
        //       title: {
        //         type: RefractTypes.string,
        //         resolve: ({ title }) => (title ? title.toUpperCase() : '')
        //       },
        //       highlightedProduct: resolveReference(ProductSchema, 'highlightedProductId'),
        //       highlightedProducts: resolveReferences(ProductSchema, 'otherRelatedProductIds')
        //     };
        //   }
        // ),
        // createPublicSchema(SettingsSchema, ({ resolveImageProperty, schema, resolveReference, resolveReferences }) => {
        //   return {
        //     ...schema.properties,
        //     highlightedArticles: resolveReferences(NewsArticleSchema, 'highlightedArticleIds')
        //   };
        // })
      ]
    });
  });
