export interface EntityState {
  [key: string]: {
    orderByField: string;
    orderByDirection: 'ASC' | 'DESC'
  }
}