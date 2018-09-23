import { Entity } from "../shared/entity.model";

export interface Editor extends Entity {
  displayName: string;
  username: string;
  password: string;
}