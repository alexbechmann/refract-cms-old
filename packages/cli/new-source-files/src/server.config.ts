import dotenv from 'dotenv';
import { createPublicSchema } from '@refract-cms/server';
import { CliServerConfig } from '@refract-cms/cli';
import { RefractTypes } from '@refract-cms/core';
import { ProductSchema } from './products/product.schema';
import { NewsArticleSchema } from './news/news-article.schema';
import { SettingsSchema } from './settings/settings.model';

const env = dotenv.config().parsed;

const serverConfig: CliServerConfig = {
  mongoConnectionString: env.MONGO_URI,
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
    createPublicSchema(ProductSchema, () => ({
      ...ProductSchema.properties,
      someVar: {
        type: RefractTypes.string,
        resolve: product => `${product._id}_hello!`
      }
    })),
    createPublicSchema(NewsArticleSchema, helpers => {
      return {
        ...NewsArticleSchema.properties,
        imageModel: helpers.resolveImageProperty('image'),
        title: {
          type: RefractTypes.string,
          resolve: ({ title }) => (title ? title.toUpperCase() : '')
        },
        highlightedProduct: helpers.resolveReference(ProductSchema, 'highlightedProductId'),
        highlightedProducts: helpers.resolveReferences(ProductSchema, 'otherRelatedProductIds')
      };
    }),
    createPublicSchema(SettingsSchema, helpers => ({
      ...SettingsSchema.properties,
      highlightedArticles: helpers.resolveReferences(NewsArticleSchema, 'highlightedArticleIds')
    }))
  ]
};

export default serverConfig;
