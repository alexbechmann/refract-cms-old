import { Entity, Location } from "@refract-cms/core";

export interface Product extends Entity {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  imageIds: string[];
  category: string;
  types: string[];
}

