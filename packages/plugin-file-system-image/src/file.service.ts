// import { ImageRef } from './image-ref.model';
import { Crop } from './crop.model';
import queryString from 'query-string';
// import { FileModel } from './file.model';
import url from 'url';

export class FileService {
  constructor(private serverUrl: string) {}
  // buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
  //   `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;

  buildImageUrl = ({ fileId, pixelCrop }: { fileId: string; pixelCrop?: Crop['pixelCrop'] }) => {
    const cropQuery = pixelCrop ? `?${queryString.stringify(pixelCrop)}` : '';
    return url.resolve(this.serverUrl, `/plugins/filesystemimage/files/${fileId}${cropQuery}`);
  };

  // upload = (file: File) => {
  //   const data = new FormData();
  //   data.append('file', file);
  //   return axios.post(`${this.serverUrl}/files`, data).then(r => r.data);
  // };
}
