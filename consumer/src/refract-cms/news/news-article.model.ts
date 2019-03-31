import { ImageModel } from '@refract-cms/server';
import { Entity } from '@refract-cms/core';

export interface NewsArticleModel extends Entity {
  image: ImageModel<'profile' | 'large'>;
  title: string;
  articleDate: Date;
}
