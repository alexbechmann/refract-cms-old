import { Entity, ImageRef } from '@refract-cms/core';

export interface NewsArticleEntity extends Entity {
  title: string;
  articleText: string;
  extraText: string;
  articleDate: Date;
  listOfStrings: string[];
  image: ImageRef<'profile' | 'large'>;
  item: {
    id: string;
    meta: {
      location: string;
      count: number;
      deep: {
        level: number;
      };
    };
  };
  primary: boolean;
  // relatedProducts: Product[];
  // highlightedProduct: EntityRef<Product>;
  highlightedProductId: string;
  otherRelatedProductIds: string[];
}
