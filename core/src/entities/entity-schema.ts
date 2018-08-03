import { EntityOptions } from "./entity-options";
import { PropertyOptions } from "../properties/property-options";

export interface EntitySchema {
  options: EntityOptions,
  properties: {[key: string]: PropertyOptions};
}