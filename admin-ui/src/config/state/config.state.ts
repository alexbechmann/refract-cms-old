import { EntitySchema } from "../../entities/entity-schema";

export interface ConfigState {
  serverUrl: string;
  schema: EntitySchema[];
}