import { EntityOptions } from "./entity-options";
import { PropertyOptions } from "../properties/property-options";
import { Entity } from "../generated";

export interface EntitySchema {
  options: EntityOptions<Entity>,
  properties: {[key: string]: PropertyOptions};
}