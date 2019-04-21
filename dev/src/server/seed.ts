import { refractCmsHandler, createPublicSchema, repositoryForSchema } from '@refract-cms/server';
import { ProductSchema } from '../refract-cms/products/product.schema';
import { NewsArticleSchema } from '../refract-cms/news/news-article.schema';
import chalk from 'chalk';
import { SettingsSchema } from '../refract-cms/settings/settings.model';

export default async () => {
  console.log(chalk.blue('Seeding test data...'));

  const Product = repositoryForSchema(ProductSchema);
  const product = new Product();
  product.title = 'TV';
  product.types = ['Electronics'];
  await product.save();

  const NewsArticle = repositoryForSchema(NewsArticleSchema);

  const article1 = new NewsArticle();
  article1.title = 'News article 1';
  article1.createDate = new Date();
  article1.updateDate = new Date();
  article1.articleDate = new Date();
  article1.extraText = 'hello';
  await article1.save();

  const article2 = new NewsArticle();
  article2.title = 'News article 2';
  article2.createDate = new Date();
  article2.updateDate = new Date();
  article2.articleDate = new Date();
  article2.extraText = 'this is article 2';
  article2.highlightedProductId = product.id;
  await article2.save();

  const Settings = repositoryForSchema(SettingsSchema);
  const settings = new Settings();
  settings.highlightedArticleIds = [article1.id, article2.id];
  settings.setting1 = 'Setting value 1';
  await settings.save();

  console.log(chalk.green('Seed complete'));
};
