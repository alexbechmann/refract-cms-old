import { Entity, Location } from '@refract-cms/core';

export interface ProductEntity extends Entity {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  category: string;
  types: string[];
}
