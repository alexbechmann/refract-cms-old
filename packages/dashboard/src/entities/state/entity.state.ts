export interface EntityState {
  [key: string]: {
    orderByField: string;
    orderByDirection: 'ASC' | 'DESC';
    filters: {
      propertyKey: string;
      operator: 'eq' | 'neq';
      value: any;
    }[];
  };
}
