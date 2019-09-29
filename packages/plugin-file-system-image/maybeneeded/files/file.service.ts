// import { ImageRef } from './image-ref.model';
// import { Crop } from './crop.model';
// import queryString from 'query-string';
// import axios from 'axios';
// import { FileModel } from './file.model';

// export class FileService {
//   constructor(private serverUrl: string) {}
//   // buildImageUrl = <TCrops extends string>(imageRef: ImageRef<TCrops>, crop: Crop) =>
//   //   `${imageRef.imageUrl}?${queryString.stringify(crop.pixelCrop)}`;

//   buildImageUrl = (fileId: string, crop?: Crop) => {
//     const cropQuery = crop ? `?${queryString.stringify(crop.pixelCrop)}` : '';
//     return `${this.serverUrl}/files/${fileId}${cropQuery}`;
//   };

//   upload = (file: File) => {
//     const data = new FormData();
//     data.append('file', file);
//     return axios.post(`${this.serverUrl}/files`, data).then(r => r.data);
//   };
// }
