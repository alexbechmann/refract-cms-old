import { EntitySchema } from "../entities/entity-schema";

export interface Config {
  serverUrl: string;
  schema: EntitySchema[];
  firebaseConfig: Object;
}