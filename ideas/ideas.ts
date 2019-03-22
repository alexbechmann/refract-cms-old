import { extendSchema } from "graphql";

interface Entity {
  id: string;
}

interface NewsArticleEntity extends Entity {
  imageId: string;
}

interface NewsArticleModel {
  image: {
    thumb: string;
    max: string;
  };
}

const createSchema = <TEntity>() => ({
  alias: 'ALIAS'
});

type SetupServerOptions = {
  [key: string]: {
    resolve: (entity: NewsArticleEntity) => NewsArticleModel | Promise<NewsArticleModel>;
  };
};

const createResolve: any = () => {};

const setupServer = (options: SetupServerOptions) => {};

const NewsArticleSchema = createSchema<NewsArticleEntity>();

// server
setupServer({
  [NewsArticleSchema.alias]: extendSchema(NewsArticleSchema, {
    resolve: createResolve({
      image: RefractTypes.image
    })(newsArticleEntity => {
      return Promise.resolve({
        image: {
          thumb: `/images/${newsArticleEntity.imageId}?w=400&h=400`,
          max: `/images/${newsArticleEntity.imageId}?w=1200&h=760`
        }
      });
    }),
    events: {
      onSave: () => {}
    }
  }
});
