import { Entity } from '@refract-cms/core';
import { FileRef } from './file-ref.model';

export interface FileModel extends Entity {
  fileRef: FileRef;
}
