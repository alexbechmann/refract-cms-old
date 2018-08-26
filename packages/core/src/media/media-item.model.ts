import { Crop } from 'react-image-crop';
import { Entity } from '../entities/entity.model';

export interface MediaItem extends Entity {
  crops?: Crop[];
}
