import { EntityListFilter } from '../models/entity-list-filter.model';
import { EntitySchema } from '@refract-cms/core';

export interface EntityStateItem {
  schema: EntitySchema<any>;
  orderByField: string;
  orderByDirection: 'ASC' | 'DESC';
  filters: EntityListFilter[];
  currentPage: number;
  query: any;
  queryVariables: {
    filter: any;
    sort: any;
    pagination: {
      skip: number;
      limit: number;
    };
  };
}

export interface EntityState {
  [key: string]: EntityStateItem;
}
