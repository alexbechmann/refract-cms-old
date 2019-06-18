import { EntityListFilter } from '../models/entity-list-filter.model';

export interface EntityState {
  [key: string]: {
    orderByField: string;
    orderByDirection: 'ASC' | 'DESC';
    filters: EntityListFilter[];
    currentPage: number;
  };
}
