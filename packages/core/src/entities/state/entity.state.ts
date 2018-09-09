import { Entity } from "../entity.model";

export interface EntityState {
  entities: {[key: string]: Entity[]};
  loading: {[key: string]: boolean};
}