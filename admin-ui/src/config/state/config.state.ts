import { EntityMetadata } from "../../schema/entity-metadata";

export interface ConfigState {
  serverUrl: string;
  entities: EntityMetadata[];
}