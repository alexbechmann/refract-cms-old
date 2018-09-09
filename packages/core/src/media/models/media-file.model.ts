import { Entity } from "../../entities/entity.model";

export interface MediaFile extends Entity {
  metadata: {
    mimetype: string;
    size: {
      width: number;
      height: number;
    };
  };
}