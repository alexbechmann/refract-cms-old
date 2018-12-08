import { Crop } from './crop.model';

export type Crops<T extends string> = { [P in T]: Crop };

export interface ImageRef<TCrops extends string> {
  imageId: string;
  imageUrl: string;
  crops: Crops<TCrops>;
}
