import { ImageRef } from './image-ref.model';
import { Crop } from './crop.model';
import queryString from 'query-string';
import axios from 'axios';

class FileService {
  buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
    `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;

  upload = (file: File, name: string) => {
    const data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`/cms/files`, data).then(r => r.data);
  };
}

export const fileService = new FileService();
