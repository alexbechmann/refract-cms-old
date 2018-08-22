import { Entity } from '@refract-cms/core';

export interface NewsArticle extends Entity {
  title: string;
  articleText: string;
  relevantProductsIds: string[];
  extraText: string;
  articleDate: Date;
  listOfStrings: string[];
}