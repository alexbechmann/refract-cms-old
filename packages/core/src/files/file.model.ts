import { Entity } from '../entities/entity.model';

export interface FileModel extends Entity {
  mimetype: string;
  url: string;
  fileName: string;
}
