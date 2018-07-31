import { EntityOptions } from "./entity-options";
import { PropertyOptions } from "./property-options";

export interface EntityMetadata {
  options: EntityOptions,
  properties: {[key: string]: PropertyOptions};
}