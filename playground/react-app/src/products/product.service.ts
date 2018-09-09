import { EntityService } from '@refract-cms/core';
import { Product } from './product.model';

export const productService = new EntityService<Product>({
  alias: 'product'
});
