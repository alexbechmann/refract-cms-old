import { Entity, Location, MediaItem } from "@refract-cms/core";

export interface Product extends Entity {
  productType: string;
  customNumber: number;
  location: Location;
  title: string;
  image: MediaItem;
  category: string;
  types: string[];
}

