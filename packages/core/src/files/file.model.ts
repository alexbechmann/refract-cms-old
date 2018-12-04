import { Entity } from '../entities/entity.model';

export interface File extends Entity {
  mimetype: string;
  url: string;
}
