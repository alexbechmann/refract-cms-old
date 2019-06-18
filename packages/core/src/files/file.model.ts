import { Entity } from '../entities/entity.model';
import { FileRef } from './file-ref.model';

export interface FileModel extends Entity {
  fileRef: FileRef;
}
