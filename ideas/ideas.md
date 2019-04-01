```ts

const app = express();

app.use(
  ...refractCmsHandler({
    serverConfig: {
      config,
      rootPath: '/cms',
      mongoConnectionString: 'mongodb://localhost:27018/refract-consumer-example',
      filesPath: 'consumer/files/',
      auth: {
        adminCredentials: {
          username: 'admin',
          password: 'pw'
        },
        jwt: {
          issuer: 'consumer',
          secret: 'secret'
        }
      },
      publicGraphQL: ({ serverConfig }) => [
        createPublicSchema<{ someVar: string }>(ProductSchema, {
          ...ProductSchema.properties,
          someVar: {
            type: RefractTypes.string,
            resolve: product => `${product._id}_hello!`
          }
        }),
        createPublicSchema<NewsArticleModel>(NewsArticleSchema, {
          image: resolveImageProperty('image'),
          title: resolveDefault('title')
          articleDate: resolveDefault('articleDate')
        })
      ]
    }
  })
);
```
