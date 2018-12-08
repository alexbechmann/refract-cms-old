import { ImageRef } from './image-ref.model';
import { Crop } from './crop.model';
import queryString from 'query-string';

class FileService {
  buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
    `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;
}

export const fileService = new FileService();
