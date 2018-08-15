export interface EntityOptions<T = {}> { 
  alias: string;
  displayName?: string;
  maxOne?: boolean;
  instanceDisplayName?: (item: T) => string;
}