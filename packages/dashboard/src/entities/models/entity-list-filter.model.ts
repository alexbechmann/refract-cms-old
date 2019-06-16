export interface EntityListFilter {
  propertyKey: string;
  operater: 'eq' | 'neq';
  value: any;
}
