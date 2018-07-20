import { entity, register, getAllEntities, property, setupExpress } from '@headless-cms/core';
import * as express from 'express';
import Product from '@src/products/product.model';
import NewsArticle from '@src/news/news-article.model';

register(Product, NewsArticle);

const app = express();

setupExpress(app);
app.listen(3300, () => console.log('Example app listening on port 3300!'))