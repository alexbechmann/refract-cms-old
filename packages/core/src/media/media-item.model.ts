import { Entity } from '../entities/entity.model';
import { Crops } from './models/crops.model';

export interface MediaItem extends Entity {
  crops?: {
    [key: string]: Crops;
  };
}
