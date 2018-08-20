import { Crop } from './crop.model';
import { Entity } from '../entities/entity.model';

export interface MediaItem extends Entity {
  crops?: Crop[];
}
