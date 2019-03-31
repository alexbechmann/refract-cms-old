import { ImageModel } from '@refract-cms/server';
import { Entity } from '@refract-cms/core';
import { NewsArticleEntity } from './news-article.entity';

export interface NewsArticleModel extends NewsArticleEntity {
  imageModel: ImageModel<'profile' | 'large'>;
}
