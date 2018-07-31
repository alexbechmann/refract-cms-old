import { EntityMetadata } from "../../entities/entity-metadata";

export interface ConfigState {
  serverUrl: string;
  entities: EntityMetadata[];
}