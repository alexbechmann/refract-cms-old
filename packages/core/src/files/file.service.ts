import { ImageRef } from './image-ref.model';
import { Crop } from './crop.model';
import queryString from 'query-string';
import axios from 'axios';
import { FileModel } from './file.model';

class FileService {
  // buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
  //   `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;

  buildImageUrl = (fileId: string, crop?: Crop) => {
    const cropQuery = crop ? `?${queryString.stringify(crop.pixelCrop)}` : '';
    return `/cms/files/${fileId}${cropQuery}`;
  };

  upload = (file: File, name: string) => {
    const data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return axios.post(`/cms/files`, data).then(r => r.data);
  };
}

export const fileService = new FileService();
